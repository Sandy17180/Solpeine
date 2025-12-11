// Cloudinary URL helper (ES module)
// - If `pathOrUrl` is already a full URL (starts with http) or already points
//   at res.cloudinary.com, it's returned unchanged. This makes it easy to use
//   direct Cloudinary URLs that you create via the Cloudinary dashboard.
// - Otherwise we generate a Cloudinary URL under the `solpiene/` folder so
//   uploads you place in the dashboard under that folder will be reachable.
// - Always applies `f_auto` and `q_auto` by default; accepts width/height/crop
//   options.
export function imageUrl(pathOrUrl, options = {}) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');

  const str = String(pathOrUrl || '');

  // If the user already provided a full URL (or a Cloudinary URL), just return it.
  if (/^https?:\/\//i.test(str) || str.includes('res.cloudinary.com')) return str;

  // strip leading slash, and build public id under solpiene/ namespace
  const clean = str.replace(/^\//, '');
  const publicId = `solpiene/${clean}`;

  const base = `https://res.cloudinary.com/${cloud}/image/upload`;

  const transforms = [];
  transforms.push('f_auto', 'q_auto');
  if (options.w) transforms.push(`w_${options.w}`);
  if (options.h) transforms.push(`h_${options.h}`);
  if (options.c) transforms.push(`c_${options.c}`);

  const t = transforms.join(',');

  // encode each segment of the public id to be safe with spaces/special chars
  const encoded = publicId.split('/').map(encodeURIComponent).join('/');

  return `${base}/${t}/${encoded}`;
}

const cloudinary = { imageUrl };
export default cloudinary;
