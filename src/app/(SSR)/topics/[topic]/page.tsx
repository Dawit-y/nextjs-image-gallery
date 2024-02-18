import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import { Metadata } from "next";

interface PageProps {
  params: { topic: string };
}

// export const dynamicParams = false; this will disable searching dynamically except the staticparams

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: { topic } + " | DGallary",
  };
}

export function generateStaticParams() {
  return ["coding", "fitness", "love"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          src={image.urls.raw}
          alt={image.description}
          className="m-2 rounded shadow-md min-w-100 h-full object-cover"
          width={250}
          height={250}
          key={image.urls.raw}
        />
      ))}
    </div>
  );
}
