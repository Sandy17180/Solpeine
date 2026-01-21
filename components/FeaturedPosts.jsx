import Image from "next/image";
import { getFeaturedPosts } from "@/data/featuredPost";
import FeaturedPostsClient from "@/components/FeaturedPostsClient";
import { sawarabi, taprom, lato } from "@/lib/fonts";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <>
      <section className="relative max-w-7xl mx-auto md:px-4 px-5 md:pt-16 md:pb-64 pb-16 bg-[#F5F1EA]">
        <h2
          className={`text-3xl text-center md:mb-20 mb-[10px] text-[#D94A27] relative ${taprom.className} md:px-0 px-12`}
        >
          <div className="flex justify-center md:mt-4">
            <Image
              src="/FeaturedPosts.png"
              alt="ECG line under heading"
              width={480}
              height={115}
              priority
              className="text-orange-500 md:w-[480px] md:h-[115px] h-[60px] md:mb-0 mb-1"
            />
          </div>
        </h2>

        <FeaturedPostsClient
          posts={featuredPosts}
          fonts={{ lato, taprom, sawarabi }}
        />
      </section>
    </>
  );
}
