// Server-side proxy to fetch the profile image from Cloudinary with cache disabled.
// This ensures when the asset is replaced in Cloudinary the site shows the
// updated image immediately.

export async function GET(request) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (cloud) {
      const cloudUrl = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/solpiene/about/profile-image`;
      const res = await fetch(cloudUrl, { cache: "no-store" });

      if (res.ok) {
        const headers = new Headers(res.headers);
        headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        if (res.headers.get("content-type")) {
          headers.set("Content-Type", res.headers.get("content-type"));
        }
        return new Response(res.body, { status: res.status, headers });
      }
    }
  } catch (err) {
    console.warn("Profile image fetch failed, using fallback:", err.message);
  }

  // Graceful fallback to local profile image
  return Response.redirect(new URL("/sandeep_profile.jpg", request.url), 307);
}
