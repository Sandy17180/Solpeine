import { genres } from "@/data/genres";
import PetPortfolio from "@/components/PetPortfolioServer";
import FashionPortfolio from "@/components/FashionPortfolioServer";
import PortraiturePortfolio from "@/components/PortraiturePortfolioServer";
import HeadshotPortfolio from "@/components/HeadshotPortfolioServer";
import Portfolio from "@/components/PortfolioServer";
import LifestyleGenre from "@/components/LifestyleGenreServer";
import PreandPostWedding from "@/components/PreandPostWeddingServer";
import Events from "@/components/EventsServer";
import ProductGenre from "@/components/ProductGenreServer";

export async function generateStaticParams() {
  return genres.map((genre) => ({
    genre: genre,
  }));
}

export default async function GenrePage({ params }) {
  const { genre: rawGenre } = await params;
  const genre = rawGenre?.toLowerCase();

  const renderContent = () => {
    switch (genre) {
      case "pet":
        return <PetPortfolio />;
      case "fashion":
        return <FashionPortfolio />;
      case "portraiture":
        return <PortraiturePortfolio />;
      case "headshots":
        return <HeadshotPortfolio />;
      case "portfolio":
        return <Portfolio />;
      case "lifestyle":
        return <LifestyleGenre />;
      case "pre_and_post_wedding":
        return <PreandPostWedding />;
      case "product":
        return <ProductGenre />;
      case "events":
        return <Events />;
      default:
        return null;
    }
  };

  return <div className="md:p-10">{renderContent()}</div>;
}
