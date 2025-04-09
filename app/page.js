import FeaturedPosts from "@/components/FeaturedPosts"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroImages from "@/components/HeroImages"
import Testimonials from "@/components/Testimonials"

const page = () => {
  return (
    <>
    <Header/>
    <HeroImages/>
    <Testimonials/>
    <FeaturedPosts/>
    <Footer/>
    </>
  )
}

export default page