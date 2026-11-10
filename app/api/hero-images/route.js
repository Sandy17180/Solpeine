// Server API to return hero carousel images.
// Prefers Cloudinary (if env vars set) and falls back to local `public` images.

// Simple in-memory cache: { key: { data, expiresAt } }
const cache = {};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = cache[key];
  if (entry && entry.expiresAt > Date.now()) return entry.data;
  delete cache[key];
  return null;
}

function setCached(key, data) {
  cache[key] = { data, expiresAt: Date.now() + CACHE_TTL_MS };
}

const FALLBACK = [
  "/image6.jpg",
  "/image9.jpg",
  "/statue.jpg",
  "/image10.jpg",
  "/image12.jpg",
  "/image16.png",
  "/image18.png",
  "/image21.png",
  "/image45.png",
];

function parseNameToAlt(name) {
  const n = String(name || "");
  // remove extension if present
  const base = n.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

function buildCloudUrl(cloud, publicId) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encoded}`;
}

async function listFromCloudinary(cloud, apiKey, apiSecret) {
  const cacheKey = `hero-images-${cloud}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&max_results=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basic}` },
  });

  if (!res.ok) return [];

  const body = await res.json();
  const resources = body.resources || [];

  // Filter by asset_folder, folder, or public_id
  const filtered = resources.filter((r) => {
    const assetFolder = (r.asset_folder || "").toLowerCase();
    const folder = (r.folder || "").toLowerCase();
    const publicId = (r.public_id || "").toLowerCase();
    return (
      assetFolder.includes("landingpage/heroimages") ||
      folder.includes("landingpage/heroimages") ||
      publicId.includes("landingpage/heroimages")
    );
  });

  // Map results
  const result = filtered.map((r, i) => {
    const publicId = r.public_id;
    const filename = publicId.split("/").pop();
    return {
      id: i + 1,
      src: buildCloudUrl(cloud, publicId),
      alt: parseNameToAlt(filename),
    };
  });

  setCached(cacheKey, result);
  return result;
}

export async function GET(request) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    // Debug mode: return raw Cloudinary resource listing for inspection (development only)
    if (debug === "1" && process.env.NODE_ENV !== "production") {
      if (!cloud || !apiKey || !apiSecret) {
        return new Response(
          JSON.stringify({ error: "Cloudinary credentials not configured" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      try {
        const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
        const listUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?max_results=500&type=upload`;
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
            {
              status: 502,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        const body = await res.json();
        return new Response(
          JSON.stringify({
            resources: body.resources || [],
            count: (body.resources || []).length,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Cloudinary fetch failed",
            message: err.message || String(err),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    if (cloud && apiKey && apiSecret) {
      try {
        const list = await listFromCloudinary(cloud, apiKey, apiSecret);
        if (list && list.length > 0) {
          return new Response(JSON.stringify(list), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch (err) {
        console.error(
          "hero images Cloudinary list failed:",
          err?.message || err
        );
      }
    }

    // Fallback to local public images
    return new Response(JSON.stringify(FALLBACK), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
