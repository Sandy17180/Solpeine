import EventsClient from "./EventsClient";
import { getGenreImages } from "@/lib/cloudinary-server";

const initialEventsImages = [
  { id: 1, image: "/EventGenre.jpg", orientation: "landscape" },
  { id: 2, image: "/EventGenre.jpg", orientation: "portrait" },
  { id: 3, image: "/EventGenre.jpg", orientation: "landscape" },
  { id: 4, image: "/EventGenre.jpg", orientation: "portrait" },
];

export default async function EventsServer() {
  const images = await getGenreImages("events");
  return (
    <EventsClient
      initialImages={images.length > 0 ? images : initialEventsImages}
    />
  );
}
