import Image from "next/image";
import { Taprom } from "next/font/google";
import { Sacramento } from "next/font/google";

const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });
const sacramento = Sacramento({
    subsets: ["latin"],
    weight: "400",
  });

const featuredPosts = [
  {
    id: 1,
    image: "/wing.jpg",
    caption: "Chasing the horizon, one flight at a time.",
  },
  {
    id: 2,
    image: "/door.jpg",
    caption: "Doors don’t just close, they whisper stories of what once was.",
  },
  {
    id: 3,
    image: "/door.jpg",
    caption: "Doors don’t just close, they whisper stories of what once was.",
  },
  {
    id: 4,
    image: "/wing.jpg",
    caption: "Chasing the horizon, one flight at a time.",
  },
];

export default function FeaturedPosts() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
     <h2 className={`text-3xl text-center mb-10 ${taprom.className}`}>
        Featured posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post) => (
          <div key={post.id} className="relative group">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.image}
                alt={post.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="bg-white shadow-lg p-3 mt-2 rounded text-center font-sacramento text-xl italic">
              {post.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}