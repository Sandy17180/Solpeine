import { getReflairImages } from "@/lib/reflair";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const debug = url.searchParams.get("debug");

    if (debug === "1") {
      // For debug, we might want more info, but for now let's just return the list
      const images = await getReflairImages();
      return new Response(JSON.stringify({ resources: images, count: images.length }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const images = await getReflairImages();
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
