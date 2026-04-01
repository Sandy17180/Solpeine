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
  try {
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
  } catch (err) {
    console.warn("Local reflair directory not found or empty", err.message);
    return [];
  }
}

async function listCloudinaryReflair(cloud, apiKey, apiSecret) {
  const tryPrefixes = ["solpiene/reflair", "solpiene", ""];
  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const prefixPromises = tryPrefixes.map((p) => {
    const prefixParam = p
      ? `?prefix=${encodeURIComponent(p)}&max_results=500`
      : "?max_results=500";
    const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image/list${prefixParam}`;

    return fetch(url, {
      headers: { Authorization: `Basic ${basic}` },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
      .then((res) => (res.ok ? res.json() : { resources: [] }))
      .catch(() => ({ resources: [] }));
  });

  const results = await Promise.all(prefixPromises);

  for (const body of results) {
    const resources = body.resources || [];
    const filtered = resources.filter((r) => {
      const pid = r.public_id || "";
      const folder = r.folder || "";
      return (
        (folder && folder.toLowerCase().endsWith("/reflair")) ||
        pid.toLowerCase().includes("/reflair/") ||
        pid.toLowerCase().includes("reflair")
      );
    });

    if (filtered.length > 0) {
      return filtered.map((r, i) => {
        const publicId = r.public_id || "";
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
        return { id: `cloud-${i + 1}`, src, alt, caption };
      });
    }
  }

  // Fallback to search
  const searchUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;
  try {
    const res = await fetch(searchUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression: "folder:solpiene/reflair OR tags:reflair", max_results: 500 }),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const body = await res.json();
      const resources = body.resources || [];
      return resources.map((r, i) => {
        const publicId = r.public_id || "";
        const parts = publicId.split("/");
        const nameWithPossibleCaption = parts.slice(parts.indexOf("reflair") + 1).join("/") || parts[parts.length - 1];
        const { alt, caption } = parseNameToAltCaption(nameWithPossibleCaption);
        const encodedPublicId = publicId.split("/").map(encodeURIComponent).join("/");
        const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encodedPublicId}`;
        return { id: `search-${i + 1}`, src, alt, caption };
      });
    }
  } catch (err) {}

  return [];
}

export async function getReflairImages() {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloud && apiKey && apiSecret) {
    try {
      const images = await listCloudinaryReflair(cloud, apiKey, apiSecret);
      if (images && images.length > 0) return images;
    } catch (err) {
      console.error("Reflair Cloudinary fetch failed", err);
    }
  }

  return await listLocalReflair();
}
