import { getFeaturedPostsData } from "@/lib/featuredPosts";

export async function GET() {
  try {
    const posts = await getFeaturedPostsData();
    return Response.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to load featured posts", details: String(error) },
      { status: 500 }
    );
  }
}
