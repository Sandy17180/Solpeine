"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedPostsClient({ posts = [], fonts = {} }) {
  const lato = fonts?.lato || {};

  return (
    <div className="relative flex flex-col">
      {posts.map((post, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={post.id}
            className={`flex w-full ${
              isEven ? "justify-start" : "justify-end"
            } relative`}
          >
            <div className="flex flex-col items-center relative group transition-transform duration-500 ease-in-out hover:cursor-pointer">
              {/* Image with directional expansion */}
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                style={{
                  transformOrigin: isEven ? "left" : "right",
                }}
                className={`relative shadow-md overflow-hidden ${
                  isEven ? "md:h-[526px] h-[161px]" : "md:h-[956px] h-[273px]"
                } md:w-[604px] w-[176px]`}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Caption */}
              <div
                className={`absolute md:bottom-[-48px] bottom-[-10px] text-shadow-lg flex justify-center items-center bg-[#e6e3e3]/80 backdrop-blur-xl text-black text-center md:text-base text-[10px] italic px-6 py-3 md:rounded-2xl rounded-lg md:shadow-2xl shadow-xl md:w-[574px] w-[167px] md:h-[86px] h-[31px] transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 ${lato?.className || ""} font-normal text-xl z-5 cursor-default`}
              >
                {post.caption}
              </div>

              {/* Arrow */}
              {index < posts.length - 1 && (
                <div
                  className={`absolute bottom-0 translate-y-full z-0 ${
                    isEven
                      ? "left-[calc(100%-80%)] md:left-[calc(100%-575px)]"
                      : "right-[calc(100%-50%)] md:right-[calc(100%-280px)]"
                  }`}
                >
                  <div
                    className={`relative ${
                      isEven
                        ? "w-[180px] h-[190px] md:w-[620px] md:h-[650px]"
                        : "w-[140px] h-[100px] md:w-[316px] md:h-[302px]"
                    }`}
                  >
                    <Image
                      src={isEven ? "/arrowOdd.svg" : "/arrowEven.svg"}
                      alt="Decorative path"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
