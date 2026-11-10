import { promises as fs } from "fs";
import path from "path";
import { photos as staticReflairPhotos } from "@/data/reflair";

const VALID_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function parseNameToAltCaption(name) {
  let raw = String(name || "").replace(/\.[^.]+$/, "");
  let alt = raw.replace(/[-_]/g, " ").trim();
  let caption = "Chasing light across vast lands and skies.";
  if (raw.includes("--")) {
    const parts = raw.split("--");
    const slug = parts[0] || "";
    const captionPart = parts.slice(1).join("--") || "";
    alt = slug.replace(/[-_]/g, " ").trim();
    if (captionPart.trim()) {
      caption = captionPart.replace(/[-_]/g, " ").trim();
    }
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
    return staticReflairPhotos;
  }
}

async function listCloudinaryReflair(cloud, apiKey, apiSecret) {
  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const authHeaders = {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/json",
  };

  // 1. Primary: Cloudinary Search API (most flexible, case-insensitive, searches across asset folders and public IDs)
  const searchUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;
  const searchExpressions = [
    "folder:*reflair* OR asset_folder:*reflair* OR public_id:*reflair* OR tags:reflair",
    "folder:*Reflair* OR asset_folder:*Reflair* OR public_id:*Reflair*",
    "folder:solpiene/reflair OR folder:solpiene/Reflair OR asset_folder:solpiene/reflair",
  ];

  for (const expr of searchExpressions) {
    try {
      const res = await fetch(searchUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          expression: expr,
          max_results: 500,
          sort_by: [{ created_at: "desc" }],
        }),
      });

      if (res.ok) {
        const body = await res.json();
        const resources = body.resources || [];
        if (resources.length > 0) {
          return resources.map((r, i) => {
            const publicId = r.public_id || "";
            const filename = publicId.split("/").pop();
            const { alt, caption } = parseNameToAltCaption(filename);
            const encodedPublicId = publicId
              .split("/")
              .map(encodeURIComponent)
              .join("/");
            const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encodedPublicId}`;
            return {
              id: r.asset_id || `cloud-${i + 1}`,
              src,
              alt: alt || "Reflair photography",
              caption: caption || "Chasing light across vast lands and skies.",
              width: r.width,
              height: r.height,
            };
          });
        }
      }
    } catch (err) {
      console.warn(`Cloudinary search (${expr}) error:`, err?.message || err);
    }
  }

  // 2. Secondary: Admin API (type=upload across common prefixes)
  const prefixes = [
    "solpiene/reflair",
    "solpiene/Reflair",
    "reflair",
    "Reflair",
    "",
  ];

  for (const prefix of prefixes) {
    try {
      const prefixParam = prefix ? `&prefix=${encodeURIComponent(prefix)}` : "";
      const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&max_results=500${prefixParam}`;
      const res = await fetch(url, {
        headers: { Authorization: `Basic ${basic}` },
      });

      if (res.ok) {
        const body = await res.json();
        const resources = body.resources || [];
        const filtered = resources.filter((r) => {
          const raw = `${r.asset_folder || ""} ${r.folder || ""} ${r.public_id || ""}`.toLowerCase();
          return raw.includes("reflair");
        });

        if (filtered.length > 0) {
          return filtered.map((r, i) => {
            const publicId = r.public_id || "";
            const filename = publicId.split("/").pop();
            const { alt, caption } = parseNameToAltCaption(filename);
            const encodedPublicId = publicId
              .split("/")
              .map(encodeURIComponent)
              .join("/");
            const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encodedPublicId}`;
            return {
              id: r.asset_id || `admin-${i + 1}`,
              src,
              alt: alt || "Reflair photography",
              caption: caption || "Chasing light across vast lands and skies.",
              width: r.width,
              height: r.height,
            };
          });
        }
      }
    } catch (err) {
      console.warn(`Cloudinary admin list (${prefix}) error:`, err?.message || err);
    }
  }

  return [];
}

let reflairCache = null;
let reflairExpiry = 0;
const REFLAIR_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function getReflairImages() {
  const now = Date.now();
  if (reflairCache && reflairExpiry > now) {
    return reflairCache;
  }

  const cloud = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

  if (cloud && apiKey && apiSecret) {
    try {
      const images = await listCloudinaryReflair(cloud, apiKey, apiSecret);
      if (images && images.length > 0) {
        reflairCache = images;
        reflairExpiry = now + REFLAIR_TTL_MS;
        return images;
      }
    } catch (err) {
      console.error("Reflair Cloudinary fetch failed", err);
    }
  }

  const localImages = await listLocalReflair();
  const fallback = localImages && localImages.length > 0 ? localImages : staticReflairPhotos;
  reflairCache = fallback;
  reflairExpiry = now + REFLAIR_TTL_MS;
  return fallback;
}
