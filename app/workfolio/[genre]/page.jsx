"use client";

import { useParams } from "next/navigation";
import { genres } from "@/data/genres";
import PetPortfolio from "@/components/PetPortfolioServer";
import FashionPortfolio from "@/components/FashionPortfolioServer";
import PortraiturePortfolio from "@/components/PortraiturePortfolioServer";
import HeadshotPortfolio from "@/components/HeadshotPortfolioServer";
import Portfolio from "@/components/PortfolioServer";
import LifestyleGenre from "@/components/LifestyleGenre";
import PreandPostWedding from "@/components/PreandPostWedding";
import Events from "@/components/Events";
import ProductGenre from "@/components/ProductGenre";

import Link from "next/link";

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
        return <PetPortfolio />; //almost done
      case "fashion":
        return <FashionPortfolio />; //done
      case "portraiture":
        return <PortraiturePortfolio />; //done
      case "headshots":
        return <HeadshotPortfolio />; //done
      case "portfolio":
        return <Portfolio />; //done
      case "lifestyle":
        return <LifestyleGenre />; //halfway done
      case "pre_and_post_wedding":
        return <PreandPostWedding />; //almost done
      case "product":
        return <ProductGenre />; //almost done
      case "events":
        return <Events />;
      default:
    }
  };

  return <div className="md:p-10">{renderContent()}</div>;
}
