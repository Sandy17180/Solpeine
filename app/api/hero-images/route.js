import { getHeroImagesData } from "@/lib/heroImages";

export async function GET() {
  try {
    const images = await getHeroImagesData();
    return Response.json(images, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
