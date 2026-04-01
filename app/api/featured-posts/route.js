import { v2 as cloudinary } from "cloudinary";
import captions from "@/data/featuredPostCaptions.json";

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudKey = process.env.CLOUDINARY_API_KEY;
  const cloudSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !cloudKey || !cloudSecret) {
    return Response.json(
      { error: "Missing Cloudinary credentials" },
      { status: 500 }
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret,
  });

  const folders = [
    "solpiene/landingpage/featuredPost/portrait",
    "solpiene/landingpage/featuredPost/fashion",
    "solpiene/landingpage/featuredPost/product",
    "solpiene/landingpage/featuredPost/lifestyle",
    "solpiene/landingpage/featuredPost/portfolio",
    "solpiene/landingpage/featuredPost/prewedding",
    "solpiene/landingpage/featuredPost/event",
    "solpiene/landingpage/featuredPost/headshot",
    "solpiene/landingpage/featuredPost/pet",
  ];

  try {
    const posts = await Promise.all(
      folders.map(async (folder, index) => {
        try {
          const list = await cloudinary.api.resources({
            type: "upload",
            prefix: folder,
            max_results: 1,
          });

          if (list.resources.length === 0) {
            console.warn("No files found in Cloudinary folder:", folder, ". Falling back to local image.");
            
            // Get genre name from folder path
            const genre = folder.split("/").pop();
            
            // Map folder names to local filenames
            const localMap = {
              portrait: "/Portrait.jpg",
              fashion: "/Fashion.jpg",
              product: "/Product.jpeg",
              lifestyle: "/Lifestyle.jpg",
              portfolio: "/Portfolio.jpg",
              prewedding: "/Pre-Wedding.jpg",
              event: "/Event.jpg",
              headshot: "/Headshot.jpg",
              pet: "/Pet.jpg",
            };

            const localImage = localMap[genre] || "";
            const caption = captions[genre] || "Featured post";

            return {
              id: index + 1,
              image: localImage,
              caption,
              publicId: folder,
              isFallback: true,
            };
          }

          const file = list.resources[0];
          const publicId = file.public_id;
          const imageUrl = file.secure_url;

          // Get caption from JSON file based on folder name
          const folderName = folder.split("/").pop();
          const caption = captions[folderName] || "Featured post";

          return {
            id: index + 1,
            image: imageUrl,
            caption,
            publicId,
          };
        } catch (err) {
          console.error(`Error reading folder ${folder}:`, err);
          
          const genre = folder.split("/").pop();
          const localMap = {
            portrait: "/Portrait.jpg",
            fashion: "/Fashion.jpg",
            product: "/Product.jpeg",
            lifestyle: "/Lifestyle.jpg",
            portfolio: "/Portfolio.jpg",
            prewedding: "/Pre-Wedding.jpg",
            event: "/Event.jpg",
            headshot: "/Headshot.jpg",
            pet: "/Pet.jpg",
          };

          const localImage = localMap[genre] || "";
          const caption = captions[genre] || "Featured post";

          return {
            id: index + 1,
            image: localImage,
            caption,
            publicId: folder,
            isFallback: true,
          };
        }
      })
    );

    console.log(posts);
    return Response.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Cloudinary FeaturedPosts API error:", error);
    return Response.json(
      { error: "Failed to load featured posts", details: String(error) },
      { status: 500 }
    );
  }
}
