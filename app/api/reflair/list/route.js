import { getReflairImages } from "@/lib/reflair";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (debug === "1") {
      const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
      const authHeader = { Authorization: `Basic ${basic}` };

      // Test 1: Folders API
      let foldersRes = null;
      try {
        const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/folders`, {
          headers: authHeader,
        });
        foldersRes = { status: r.status, data: await r.json() };
      } catch (e) {
        foldersRes = { error: String(e) };
      }

      // Test 2: Search API with simple expression
      let searchRes = null;
      try {
        const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/search`, {
          method: "POST",
          headers: { ...authHeader, "Content-Type": "application/json" },
          body: JSON.stringify({ expression: "reflair", max_results: 20 }),
        });
        searchRes = { status: r.status, data: await r.json() };
      } catch (e) {
        searchRes = { error: String(e) };
      }

      // Test 3: Admin API upload resources
      let adminRes = null;
      try {
        const r = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload?max_results=20`,
          { headers: authHeader }
        );
        adminRes = { status: r.status, data: await r.json() };
      } catch (e) {
        adminRes = { error: String(e) };
      }

      const images = await getReflairImages();

      return new Response(
        JSON.stringify({
          cloud,
          hasKey: Boolean(apiKey),
          hasSecret: Boolean(apiSecret),
          foldersRes,
          searchRes,
          adminRes,
          reflairCount: images.length,
          resources: images,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const images = await getReflairImages();
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error in reflair list:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
