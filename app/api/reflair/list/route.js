import { promises as fs } from "fs";
import path from "path";

const VALID_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function parseNameToAltCaption(name) {
  let alt = name.replace(/[-_]/g, " ").trim();
  let caption = "";
  if (name.includes("--")) {
    const parts = name.split("--");
    const slug = parts[0] || "";
    const captionPart = parts.slice(1).join("--") || "";
    alt = slug.replace(/[-_]/g, " ").trim();
    caption = captionPart.replace(/[-_]/g, " ").trim();
  }
  return { alt, caption };
}

async function listLocalReflair() {
  const publicDir = path.join(process.cwd(), "public", "reflair");
  const files = await fs.readdir(publicDir);
  return files
    .filter((f) => VALID_EXT.includes(path.extname(f).toLowerCase()))
    .map((f, i) => {
      const name = f.replace(path.extname(f), "");
      const { alt, caption } = parseNameToAltCaption(name);
      return {
        id: i + 1,
        src: `/reflair/${encodeURIComponent(f)}`,
        alt,
        caption,
      };
    });
}

async function listCloudinaryReflair(cloud, apiKey, apiSecret) {
  // Try multiple prefixes to find images the user may have uploaded.
  const tryPrefixes = ["solpiene/reflair", "solpiene", ""];
  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  for (const p of tryPrefixes) {
    const prefixParam = p
      ? `?prefix=${encodeURIComponent(p)}&max_results=500`
      : "?max_results=500";
    const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image/list${prefixParam}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${basic}`,
      },
    });
    if (!res.ok) {
      // try next prefix
      continue;
    }
    const body = await res.json();
    const resources = body.resources || [];

    // Filter resources to those likely part of the reflair set. We include resources
    // whose folder ends with 'reflair' or whose public_id contains '/reflair/' or 'reflair'.
    const filtered = resources.filter((r) => {
      const pid = r.public_id || "";
      const folder = r.folder || "";
      return (
        (folder && folder.toLowerCase().endsWith("/reflair")) ||
        pid.toLowerCase().includes("/reflair/") ||
        pid.toLowerCase().includes("reflair")
      );
    });

    // If we found candidates, map them and return.
    if (filtered.length > 0) {
      return filtered.map((r, i) => {
        const publicId = r.public_id || "";
        // Derive the name part after any folder to parse caption
        const parts = publicId.split("/");
        const nameWithPossibleCaption = parts
          .slice(parts.indexOf("reflair") + 1)
          .join("/");
        const { alt, caption } = parseNameToAltCaption(
          nameWithPossibleCaption || parts[parts.length - 1] || publicId
        );
        const encodedPublicId = publicId
          .split("/")
          .map(encodeURIComponent)
          .join("/");
        const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encodedPublicId}`;
        return { id: i + 1, src, alt, caption };
      });
    }
    // otherwise try next prefix
  }

  // If nothing matched, return empty array so caller can fallback to local
  // As a fallback, try Cloudinary Search API with a few expressions to locate
  // resources that may be uploaded at root or tagged differently.
  const searchExpressions = [
    `folder:solpiene/reflair`,
    `folder:solpiene`,
    `tags:reflair`,
    `public_id:*reflair*`,
  ];

  for (const expr of searchExpressions) {
    try {
      const searchUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;
      const res = await fetch(searchUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression: expr, max_results: 500 }),
      });
      if (!res.ok) continue;
      const body = await res.json();
      const resources = body.resources || [];
      if (resources.length === 0) continue;

      return resources.map((r, i) => {
        const publicId = r.public_id || "";
        const parts = publicId.split("/");
        const nameWithPossibleCaption =
          parts.slice(parts.indexOf("reflair") + 1).join("/") ||
          parts[parts.length - 1] ||
          publicId;
        const { alt, caption } = parseNameToAltCaption(nameWithPossibleCaption);
        const encodedPublicId = publicId
          .split("/")
          .map(encodeURIComponent)
          .join("/");
        const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encodedPublicId}`;
        return { id: i + 1, src, alt, caption };
      });
    } catch (err) {
      // ignore and try next expression
      continue;
    }
  }

  return [];
}

export async function GET(request) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    // If debug mode requested, return raw Cloudinary listing (no filtering)
    if (debug === "1") {
      if (!cloud || !apiKey || !apiSecret) {
        return new Response(
          JSON.stringify({ error: "Cloudinary credentials not configured" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      try {
        const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
        const listUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/image/list?max_results=500`;
        const res = await fetch(listUrl, {
          headers: { Authorization: `Basic ${basic}` },
        });
        if (!res.ok) {
          const text = await res.text();
          return new Response(
            JSON.stringify({
              error: "Cloudinary API error",
              status: res.status,
              body: text,
            }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          );
        }
        const body = await res.json();
        // Return the raw resources so you can inspect public_id, folder, etc.
        return new Response(
          JSON.stringify({
            resources: body.resources || [],
            count: (body.resources || []).length,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Cloudinary fetch failed",
            message: err.message || String(err),
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // If Cloudinary credentials are available, prefer Cloudinary folder listing
    if (cloud && apiKey && apiSecret) {
      try {
        const images = await listCloudinaryReflair(cloud, apiKey, apiSecret);
        // If Cloudinary returned results, use them. Otherwise fall back to local files.
        if (images && images.length > 0) {
          return new Response(JSON.stringify(images), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        console.warn(
          "Cloudinary returned no matching reflair images; falling back to local"
        );
      } catch (err) {
        // Log and fall back to local files
        console.error(
          "Cloudinary list failed, falling back to local:",
          err.message || err
        );
      }
    }

    // Fallback: read from public/reflair/
    try {
      const local = await listLocalReflair();
      return new Response(JSON.stringify(local), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "reflair directory not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
