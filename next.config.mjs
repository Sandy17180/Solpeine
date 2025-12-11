/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Cloudinary-hosted images. We keep hostname fixed and allow any
    // Cloudinary path under it (this works even if you set a cloud name via env).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
