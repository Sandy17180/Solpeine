import Image from "next/image";
import { Taprom, Sawarabi_Mincho,Lato } from "next/font/google";

const sawarabi = Sawarabi_Mincho({ subsets: ["latin"], weight: ["400"] });
const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });
const lato = Lato({ subsets: ["latin"], weight: ["400"] });

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
    image: "/statue.jpg",
    caption: "Not just a flight, but a perspective shift...",
  },
  {
    id: 4,
    image: "/panorama.png",
    caption: "A silent witness to passing time.",
  },
  {
    id: 5,
    image: "/preWedding.jpg",
    caption: "A silent witness to passing time.",
  },
  {
    id: 6,
    image: "/Fashion.jpg",
    caption: "A quiet moment, a thousand thoughts.",
  },
  {
    id: 7,
    image: "/bike.jpg",
    caption: "Ride. Roar. Repeat.",
  },
  {
    id: 8,
    image: "/Girl.jpg",
    caption: "Glow within, shine beyond.",
  },
  {
    id: 9,
    image: "/Dog.jpg",
    caption: "Dreaming of treats and endless belly rubs.",
  },
];

export default function FeaturedPosts() {
  return (
    <>
      <section className="relative max-w-7xl mx-auto px-4 py-16 bg-[#F5F1EA]">
        <h2
          className={`text-3xl text-center mb-20 text-[#D94A27] relative ${taprom.className}`}
        >
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
              className={`flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } relative`}
            >
              {/* Image and caption wrapper */}
              <div className="flex flex-col items-center relative">
                <div className="group transition-[width] duration-500 ease-in-out block">
                  {/* image */}
                  <div
                    className={` overflow-hidden shadow-md w-[604px] ${
                      index % 2 === 0 ? "h-[526px]" : "h-[956px]"
                    } transition-[width] duration-500 ease-in-out hover:w-[630px] ${
                      index % 2 === 0 ? "origin-left" : "origin-right"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={post.caption}
                      width={604}
                      height={index % 2 === 0 ? 526 : 956}
                      className={`w-[604px] ${
                        index % 2 === 0 ? "h-[526px]" : "h-[956px]"
                      } object-cover transition-[width] duration-500 ease-in-out hover:w-[630px]`}
                    />
                  </div>

                  {/* Caption */}
                  <div
                    className={`absolute bottom-[-48px] text-shadow-lg flex justify-center items-center bg-[#e6e3e3]/80 backdrop-blur-xl text-black text-center text-base font-normal italic px-6 py-3 rounded-2xl shadow-2xl w-[574px] h-[86px] transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 ${lato.className} font-normal text-xl z-5 cursor-default`}
                  >
                    {post.caption}
                  </div>
                </div>
                {/* Arrow between items */}
                {index < featuredPosts.length - 1 && (
                  <div
                    className={`absolute bottom-0 translate-y-full w-[630px] h-[650px]${
                      index % 2 === 0
                        ? "w-[630px] h-[650px] left-[calc(100%-575px)]"
                        : "w-[316px] h-[410px] right-[calc(100%-540px)]"
                    } z-0`}
                  >
                    <Image
                      src={index % 2 === 0 ? "/arrowOdd.svg" : "/arrowEven.svg"}
                      alt="Decorative path"
                      width={index % 2 === 0 ? 620 : 316}
                      height={index % 2 === 0 ? 650 : 312}
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
