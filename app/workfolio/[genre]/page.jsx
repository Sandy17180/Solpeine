"use client";

import { useParams } from "next/navigation"; 
import { genres } from "@/data/genres";
import PetPortfolio from "@/components/PetPortfolio";
import FashionPortfolio from "@/components/FashionPortfolio";  
import PortraiturePortfolio from "@/components/PortraiturePortfolio";
import HeadshotPortfolio from "@/components/HeadshotPortfolio";
import Portfolio from "@/components/Portfolio";
import LifestyleGenre from "@/components/LifestyleGenre";
import PreandPostWedding from "@/components/PreandPostWedding";
import Events from "@/components/Events";

import Link from "next/link";
import ProductGenre from "@/components/ProductGenre";

export default function GenrePage() {
  const params = useParams();
  const genre = params.genre?.toLowerCase(); 

  // const isValidGenre = genres.includes(genre);

  // // if (!isValidGenre) {
  // //   return (
  // //     <div className="p-10 text-center">
        
  // //       <Link href="/workfolio" className="text-blue-500 underline mt-4 block">
          
  // //       </Link>
  // //     </div>
  // //   );
  // // }

  const renderContent = () => {
    switch (genre) {
      case "pet":
        return <PetPortfolio />;
      case "fashion":
         return <FashionPortfolio />;
      case "portraiture":
         return <PortraiturePortfolio />;
      case "headshots":
          return <HeadshotPortfolio/>
      case "portfolio":
          return <Portfolio/>
      case "lifestyle":
        return <LifestyleGenre/>
      case "pre_and_post_wedding":
        return <PreandPostWedding/>
      case "product":
        return <ProductGenre/>
      case "events":
        return <Events/>
      default:
        
    }
  };

  return (
    <div className="p-10">
      
      {renderContent()}
    </div>
  );
}