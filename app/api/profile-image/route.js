// Server-side proxy to fetch the profile image from Cloudinary with cache disabled.
// This ensures when the asset is replaced in Cloudinary the site shows the
// updated image immediately.

export async function GET() {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) {
      return new Response("Cloudinary cloud name not configured", {
        status: 500,
      });
    }

    // Use a stable public_id for the profile image. Upload/Replace the asset
    // in Cloudinary under this public_id (no extension):
    const cloudUrl = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/solpiene/about/profile-image`;

    const res = await fetch(cloudUrl, { cache: "no-store" });

    if (!res.ok) {
      return new Response("Image not found on Cloudinary", {
        status: res.status,
      });
    }

    const headers = new Headers(res.headers);
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    if (res.headers.get("content-type")) {
      headers.set("Content-Type", res.headers.get("content-type"));
    }

    return new Response(res.body, { status: res.status, headers });
  } catch (err) {
    return new Response("Server error fetching image", { status: 500 });
  }
}
