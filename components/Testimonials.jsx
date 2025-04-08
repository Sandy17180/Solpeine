import Link from "next/link";
import Image from "next/image";
import { Taprom } from "next/font/google";
import { Sacramento, Lobster_Two } from "next/font/google";

const sacramento = Sacramento({ subsets: ["latin"], weight: ["400"] });
const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });
const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] });

const testimonials = [
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpiene.",
    image: "/Katie.jpeg",
  },
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpiene.",
    image: "/Katie.jpeg",
  },
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpiene.",
    image: "/Katie.jpeg",
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 bg-white">
      {/* Section title */}
      <h2
        className={`text-4xl font-semibold text-center mb-2 ${taprom.className}`}
      >
        Testimonials
      </h2>

      {/* Divider line below title */}
      <div className="w-35 h-[2px] bg-gray-400 mx-auto mb-12" />

      {/* Testimonials grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-[linear-gradient(to_bottom,#BFB4B4,#F7F7F7)] shadow-sm rounded-2xl p-6 flex flex-col items-center transition hover:scale-105 duration-300"
          >
            {/* Image with gradient ring */}
            <div className="w-32 h-32 rounded-full bg-[conic-gradient(at_top_left,#BFB4B4,#F7F7F7)] p-[3px] mb-4">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className={`text-lg mb-2 text-black ${lobster.className}`}>
              {t.name}
            </h3>

            {/* Quote */}
            <p
              className={`italic text-2xl text-gray-700 mb-4 text-center ${sacramento.className}`}
            >
              {t.quote}
            </p>

            {/* Read more button */}
            <Link href="/read-more">
              <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
                Read more
              </button>
            </Link>
         

          </div>))}
          
      </div>
      <h2 className="text-3xl font-bold text-center mb-4"></h2>
      <hr className="w-1440 h-[2px] bg-gray-400 mx-auto mb-8 border-0" />
    </div>
  );
}
