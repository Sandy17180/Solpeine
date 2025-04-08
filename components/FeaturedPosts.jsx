import Image from "next/image";
import { Taprom } from "next/font/google";
import { Sacramento } from "next/font/google";

const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });

const featuredPosts = [
  {
    id: 1,
    image: "/wing.jpeg",
    caption: "Chasing the horizon, one flight at a time.",
  },
  {
    id: 2,
    image: "/door1.jpeg",
    caption: "Doors don’t just close, they whisper stories of what once was.",
  },
  {
    id: 3,
    image: "/door2.jpeg",
    caption: "Doors don’t just close, they whisper stories of what once was.",
  },
  {
    id: 4,
    image: "/wing2.jpeg",
    caption: "Chasing the horizon, one flight at a time.",
  },
];

export default function FeaturedPosts() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className={`text-3xl text-center mb-12 tracking-wide ${taprom.className}`}>
          Featured posts
        </h2>

        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 justify-center">
          {/* Left column: even index posts */}
          <div className="flex flex-col gap-10">
            {featuredPosts.filter((_, i) => i % 2 === 0).map((post) => (
              <div key={post.id} className="relative max-w-sm w-full">
                <div className="overflow-hidden rounded-lg shadow-md relative">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    width={640}
                    height={452}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-white/80 text-black text-center text-2xl italic px-4 py-3 ${sacramento.className}`}
                  >
                    {post.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column: odd index posts */}
          <div className="flex flex-col gap-10">
            {featuredPosts.filter((_, i) => i % 2 !== 0).map((post) => (
              <div key={post.id} className="relative max-w-sm w-full">
                <div className="overflow-hidden rounded-lg shadow-md relative">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    width={640}
                    height={452}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-white/80 text-black text-center text-2xl italic px-4 py-3 ${sacramento.className}`}
                  >
                    {post.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width horizontal line */}
      <hr className="w-screen h-[2px] bg-gray-400 border-0" />
    </>
  );
}