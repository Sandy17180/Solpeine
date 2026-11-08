const FALLBACK = [
  { id: 1, image: "/Portrait.jpg", alt: "Client 1" },
  { id: 2, image: "/Fashion.jpg", alt: "Client 2" },
  { id: 3, image: "/Girl.jpg", alt: "Client 3" },
  { id: 4, image: "/Katie.jpeg", alt: "Client 4" },
  { id: 5, image: "/man.png", alt: "Client 5" },
  { id: 6, image: "/man_standing.jpg", alt: "Client 6" },
  { id: 7, image: "/Headshot.jpg", alt: "Client 7" },
  { id: 8, image: "/fashionPortrait.jpg", alt: "Client 8" },
  { id: 9, image: "/image8.jpg", alt: "Client 9" },
  { id: 10, image: "/image9.jpg", alt: "Client 10" },
  { id: 11, image: "/image10.jpg", alt: "Client 11" },
  { id: 12, image: "/image11.jpg", alt: "Client 12" },
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

  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?type=upload&max_results=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basic}` },
  });

  if (!res.ok) return [];

  const body = await res.json();
  const resources = body.resources || [];

  // Filter by asset_folder for clientLogos
  const filtered = resources.filter((r) => {
    const folder = (r.asset_folder || "").toLowerCase();
    return folder.includes("clientlogos");
  });

  // Map results
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
