import FeaturedPosts from "@/components/FeaturedPosts";
import HeroImages from "@/components/HeroImagesServer";
import Testimonials from "@/components/Testimonials";

const page = () => {
  return (
    <>
      <HeroImages />
      <Testimonials />
      <FeaturedPosts />
    </>
  );
};

export default page;
