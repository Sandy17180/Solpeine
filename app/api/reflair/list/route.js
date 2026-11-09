import { getReflairImages } from "@/lib/reflair";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    const cloud = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "").trim();
    const apiKeyRaw = process.env.CLOUDINARY_API_KEY || "";
    const apiSecretRaw = process.env.CLOUDINARY_API_SECRET || "";
    const apiKey = apiKeyRaw.trim();
    const apiSecret = apiSecretRaw.trim();

    if (debug === "1") {
      const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
      const authHeader = { Authorization: `Basic ${basic}` };

      // Test 0: Ping API
      let pingRes = null;
      try {
        const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/ping`, {
          headers: authHeader,
        });
        pingRes = { status: r.status, data: await r.json() };
      } catch (e) {
        pingRes = { error: String(e) };
      }

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
          keyRawLen: apiKeyRaw.length,
          keyTrimLen: apiKey.length,
          keyStart: apiKey ? apiKey.slice(0, 4) : null,
          keyEnd: apiKey ? apiKey.slice(-4) : null,
          secretRawLen: apiSecretRaw.length,
          secretTrimLen: apiSecret.length,
          hasSecret: Boolean(apiSecret),
          pingRes,
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
