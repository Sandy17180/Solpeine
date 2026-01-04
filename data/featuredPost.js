// Fetch featured posts from the API with ISR (Incremental Static Revalidation)
export async function getFeaturedPosts() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_DEPLOYED_URL || "http://localhost:3000"
      }/api/featured-posts`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch featured posts: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

// KEEP BUT UNUSED (backward compatibility)
export const featuredPosts = [];
