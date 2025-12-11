// Server-side proxy to fetch the Cloudinary contact image with cache disabled.
// This helps ensure that when the asset is replaced in Cloudinary the site
// shows the new image immediately (bypassing CDN/browser cache).

export async function GET() {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) {
      return new Response('Cloudinary cloud name not configured', { status: 500 });
    }

    const cloudUrl = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/solpiene/contact/contact-image`;

    // Fetch without caching so we get the latest asset from Cloudinary
    const res = await fetch(cloudUrl, { cache: 'no-store' });

    if (!res.ok) {
      return new Response('Image not found on Cloudinary', { status: res.status });
    }

    // Copy response headers but enforce no-cache so browsers request fresh copies.
    const headers = new Headers(res.headers);
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    // Ensure we forward the content-type so the browser renders the image correctly
    if (res.headers.get('content-type')) {
      headers.set('Content-Type', res.headers.get('content-type'));
    }

    return new Response(res.body, { status: res.status, headers });
  } catch (err) {
    return new Response('Server error fetching image', { status: 500 });
  }
}
