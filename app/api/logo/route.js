const FALLBACK = [
  { id: 1, image: "/clientLogos/josco-jewellers.jpg", alt: "Josco Jewellers" },
  { id: 2, image: "/clientLogos/rove-clothing.jpg", alt: "Rove Clothing" },
  { id: 3, image: "/clientLogos/illuminating-windows.png", alt: "Illuminating Windows" },
  { id: 4, image: "/clientLogos/tec.jpeg", alt: "The Executive Centre" },
  { id: 5, image: "/clientLogos/zenable-me.png", alt: "Zenable ME" },
];

function parseNameToAlt(name) {
  const n = String(name || "");
  const base = n.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

function buildCloudUrl(cloud, publicId) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${encoded}`;
}

async function listFromCloudinary(cloud, apiKey, apiSecret) {
  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  // 1. First attempt: standard Admin list resources API
  try {
    const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&max_results=500`;
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${basic}` },
    });

    if (res.ok) {
      const body = await res.json();
      const resources = body.resources || [];

      // Filter by asset_folder, folder, or public_id matching client or testimonial logos
      const filtered = resources.filter((r) => {
        const raw = `${r.asset_folder || ""} ${r.folder || ""} ${r.public_id || ""}`.toLowerCase();
        const clean = raw.replace(/[\s_-]/g, "");
        return (
          clean.includes("clientlogo") ||
          clean.includes("clientlog") ||
          clean.includes("testimoniallogo") ||
          clean.includes("testimonial")
        );
      });

      if (filtered.length > 0) {
        return filtered.map((r, i) => {
          const publicId = r.public_id;
          const filename = publicId.split("/").pop();
          return {
            id: i + 1,
            image: buildCloudUrl(cloud, publicId),
            alt: parseNameToAlt(filename),
            publicId: publicId,
          };
        });
      }
    }
  } catch (err) {
    console.warn("Cloudinary resources list failed:", err?.message || err);
  }

  // 2. Second attempt: Cloudinary Search API (handles dynamic asset_folders across nested paths)
  try {
    const searchUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;
    const searchRes = await fetch(searchUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression:
          "folder:*client* OR asset_folder:*client* OR folder:*testimonial* OR asset_folder:*testimonial* OR public_id:*logo*",
        max_results: 100,
      }),
    });

    if (searchRes.ok) {
      const searchBody = await searchRes.json();
      const searchResources = searchBody.resources || [];
      if (searchResources.length > 0) {
        return searchResources.map((r, i) => {
          const publicId = r.public_id;
          const filename = publicId.split("/").pop();
          return {
            id: i + 1,
            image: buildCloudUrl(cloud, publicId),
            alt: parseNameToAlt(filename),
            publicId: publicId,
          };
        });
      }
    }
  } catch (err) {
    console.warn("Cloudinary search failed:", err?.message || err);
  }

  return [];
}

export async function GET(request) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

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
          "client logos Cloudinary list failed:",
          err?.message || err
        );
      }
    }

    // Fallback
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
