import Image from "next/image";
import { Taprom } from "next/font/google";
import { Sawarabi_Mincho } from "next/font/google";

const sawarabi = Sawarabi_Mincho({ subsets: ["latin"], weight: ["400"] });
const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });

const featuredPosts = [
  {
    id: 1,
    image: "/tiger.jpg",
    caption: "Born to roam, bound to none..",
  },
  {
    id: 2,
    image: "/door1.jpeg",
    caption: "Knock, and the unknown answers.",
  },
  {
    id: 3,
    image: "/wing.jpeg",
    caption: "Not just a flight, but a perspective shift...",
  },
  {
    id: 4,
    image: "/Tree.png",
    caption: "Stillness speaks when winds are silent.",
  },
];

export default function FeaturedPosts() {
  return (
    <>
      <section className="relative max-w-7xl mx-auto px-4 py-16 bg-[#F5F1EA]">
      
        <h2 className={`text-3xl text-center mb-20 text-[#D94A27] relative ${taprom.className}`}>
          <div className="flex justify-center mt-4">
            <Image
              src="/FeaturedPosts.png"
              alt="ECG line under heading"
              width={480}
              height={115}
              className="h-[115px] w-auto"
            />
          </div>
        </h2>

        
        <div className="relative flex flex-col ">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`flex w-full ${index % 2 === 0 ? "justify-start" : "justify-end"} relative`}
            >
              {/* Image and caption wrapper */}
              <div className="flex flex-col items-center group relative">
                <div className="overflow-hidden shadow-md w-[604px] h-[526px] ">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    width={604}
                    height={526}
                    className="w-[604px] h-[526px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 hover:w-[750px]"
                  />
                </div>

                {/* Caption */}
                <div
                  className={`absolute bottom-[-24px] bg-white/70 backdrop-blur-lg text-black text-center text-base font-normal italic px-6 py-3 rounded-2xl shadow-lg max-w-[320px] transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 ${sawarabi.className}`}
                >
                  {post.caption}
                </div>

                {/* Arrow between items */}
                {index < featuredPosts.length - 1 && (
                  <div
                    className={`absolute bottom-0 translate-y-full  w-[620px] h-[650px]${
                      index % 2 === 0 ? "left-[calc(100%-400px)]" : "right-[calc(100%-400px)]"
                    } z-0`}
                  >
                    <Image
                      src={index % 2 === 0 ? "/arrowOdd.png" : "/arrowEven.png"}
                      alt="Decorative path"
                      width={200}
                      height={200}
                      className="w-auto h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="w-screen h-[2px] bg-gray-400 border-0" />
    </>
  );
}
