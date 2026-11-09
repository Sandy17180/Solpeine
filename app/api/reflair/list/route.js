import { getReflairImages } from "@/lib/reflair";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    const images = await getReflairImages();

    if (debug === "1") {
      const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const hasKey = Boolean(process.env.CLOUDINARY_API_KEY);
      const hasSecret = Boolean(process.env.CLOUDINARY_API_SECRET);

      return new Response(
        JSON.stringify({
          cloud,
          hasKey,
          hasSecret,
          count: images.length,
          resources: images,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error in reflair list:", err);
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
