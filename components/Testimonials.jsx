import Link from "next/link";
import Image from "next/image";
import { Sawarabi_Mincho,Taprom } from "next/font/google";

const sawarabi = Sawarabi_Mincho({ subsets: ["latin"], weight: ["400"] });
const taprom = Taprom({ subsets: ["latin"], weight: ["400"] });

const testimonials = [
  {
    name: "Kate Bonham",
    quote:
      "I have never felt so comfortable in front of a camera until I worked with Solpiene.",
    image: "/Katie.jpeg",
  },
  {
    name: "Jane Doe",
    quote:
      "Solpiene captured the most authentic version of myself—I'll treasure the results forever.",
    image: "/Katie.jpeg",
  },
  {
    name: "Sarah Lee",
    quote:
      "Their team helped me feel calm, confident, and truly seen. Highly recommended!",
    image: "/Katie.jpeg",
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 bg-[#FAF4EF]">
      
      <div className="text-center mb-12">
      <h2 className={`text-[58px] leading-[70px] tracking-[0.16em] font-normal text-[#DA3E3E] ${taprom.className}`}>
          
        </h2>
        <div className="flex justify-center mt-4">
          <Image
            src="/testimonial.png" 
            alt="ECG line under heading"
            width={480}
            height={115}
            className="h-[115px] w-auto"
          />
        </div>
        
      </div>

      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#BFB4B4] to-[#F7F7F7] shadow-lg rounded-2xl px-6 py-8 flex flex-col items-center max-w-sm mx-auto  "
          >
           
            <div className="w-28 h-28 rounded-full bg-[conic-gradient(at_top_left,#BFB4B4,#F7F7F7)] p-[3px] mb-4">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            
            <h3 className={`text-lg mb-2 text-black ${sawarabi.className}`}>
              {t.name}
            </h3>

            
            <p
              className={`text-center text-md text-gray-700 mb-6 ${sawarabi.className}`}
            >
              "{t.quote}"
            </p>

            
            <Link href="/read-more">
              <button className="bg-[#D94A27] text-white px-6 py-2 rounded-full text-sm shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] duration-300">
                Read more
              </button>
            </Link>
          </div>
        ))}
      </div>

     
      <div className="text-center mt-12">
        <Link href="/testimonials">
          <button className="bg-[#D94A27] text-white px-6 py-2 rounded-full text-sm shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] duration-300">
            View more testimonials
          </button>
        </Link>
      </div>
    </div>
  );
}


