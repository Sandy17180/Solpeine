// Server-side proxy to fetch the Cloudinary contact image with cache disabled.
// This helps ensure that when the asset is replaced in Cloudinary the site
// shows the new image immediately (bypassing CDN/browser cache).

export async function GET(request) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (cloud) {
      const cloudUrl = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/solpiene/contact/contact-image`;
      const res = await fetch(cloudUrl, { cache: 'no-store' });

      if (res.ok) {
        const headers = new Headers(res.headers);
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        if (res.headers.get('content-type')) {
          headers.set('Content-Type', res.headers.get('content-type'));
        }
        return new Response(res.body, { status: res.status, headers });
      }
    }
  } catch (err) {
    console.warn("Contact image fetch failed, using fallback:", err.message);
  }

  // Graceful fallback to local image
  return Response.redirect(new URL("/image6.jpg", request.url), 307);
}
