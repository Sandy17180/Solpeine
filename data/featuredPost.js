import { getFeaturedPostsData } from "@/lib/featuredPosts";

// Fetch featured posts with in-memory caching and direct server access
export async function getFeaturedPosts() {
  return await getFeaturedPostsData();
}

// Backward compatibility export
export const featuredPosts = [];
