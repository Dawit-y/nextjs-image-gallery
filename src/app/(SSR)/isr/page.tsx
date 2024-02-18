import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Incremental Static Regeneration",
};

// export const revalidate = 0;

export default async function ISR() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      next: { revalidate: 15 },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="flex flex-col items-center height-[100vh] width-[100%]">
      <Image
        src={image.urls.raw}
        alt={image.description}
        height={height}
        width={width}
        className="m-2 rounded shadow-md min-w-100 h-full"
      />
      By:{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
