export const genres = [
  "portraiture",
  "fashion",
  "product",
  "lifestyle",
  "portfolio",
  "pre_and_post_wedding",
  "events",
  "headshots",
  "pet",
];

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudBase = CLOUD
  ? `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/`
  : "";

// Map of public IDs in Cloudinary (if you uploaded images to these public IDs,
// the site will use them automatically when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set).
const cloudPublicIds = {
  portraiture: "solpiene/genreImages/portraiture",
  fashion: "solpiene/genreImages/fashion",
  product: "solpiene/genreImages/product",
  lifestyle: "solpiene/genreImages/lifestyle",
  portfolio: "solpiene/genreImages/portfolio",
  pre_and_post_wedding: "solpiene/genreImages/pre_and_post_wedding",
  events: "solpiene/genreImages/event",
  headshots: "solpiene/genreImages/headshot",
  pet: "solpiene/genreImages/pets",
};

export const genreImages = {
  portraiture: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.portraiture)}`
    : "/Portrait.jpg",
  fashion: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.fashion)}`
    : "/Fashion.jpg",
  product: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.product)}`
    : "/Product.jpeg",
  lifestyle: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.lifestyle)}`
    : "/Lifestyle.jpg",
  portfolio: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.portfolio)}`
    : "/Portfolio.jpg",
  pre_and_post_wedding: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.pre_and_post_wedding)}`
    : "/Pre-Wedding.jpg",
  events: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.events)}`
    : "/Event.jpg",
  headshots: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.headshots)}`
    : "/Headshot.jpg",
  pet: CLOUD
    ? `${cloudBase}${encodeURIComponent(cloudPublicIds.pet)}`
    : "/Pet.jpg",
};

export const genreCaption = [
  "Portraiture",
  "Fashion",
  "Product",
  "Lifestyle",
  "Portfolio",
  "Pre and Post Wedding",
  "Events",
  "Headshots",
  "Pet",
];
