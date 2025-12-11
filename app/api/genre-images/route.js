import { NextResponse } from "next/server";

function buildCloudUrl(cloud, publicId) {
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${publicId}`;
}

function parseNameToAlt(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .trim();
}

export async function GET(request) {
  const url = new URL(request.url);
  const genre = url.searchParams.get("genre");

  if (!genre) {
    return NextResponse.json({ error: "genre required" }, { status: 400 });
  }

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  const folder = `solpiene/individualGenreImages/${genre}`;

  try {
    const auth = Buffer.from(`${key}:${secret}`).toString("base64");

    // --- MAIN: use correct Cloudinary listing endpoint ---
    const listUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?prefix=${encodeURIComponent(
      folder
    )}&max_results=500`;

    const res = await fetch(listUrl, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const body = await res.json();
    const resources = body?.resources || [];

    if (resources.length > 0) {
      const mapped = resources.map((r, i) => ({
        id: i + 1,
        image: buildCloudUrl(cloud, r.public_id),
        alt: parseNameToAlt(r.public_id.split("/").pop()),
        orientation: r.height >= r.width ? "portrait" : "landscape",
      }));

      return NextResponse.json(mapped);
    }

    // --- FALLBACK to Search API ---
    const searchRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: `folder="${folder}"`,
          max_results: 500,
        }),
      }
    );

    const searchBody = await searchRes.json();
    const searchResources = searchBody?.resources || [];

    if (searchResources.length > 0) {
      const mapped = searchResources.map((r, i) => ({
        id: i + 1,
        image: buildCloudUrl(cloud, r.public_id),
        alt: parseNameToAlt(r.public_id.split("/").pop()),
        orientation: r.height >= r.width ? "portrait" : "landscape",
      }));

      return NextResponse.json(mapped);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
