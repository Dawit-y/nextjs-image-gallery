"use client";

import { UnsplashImage } from "@/models/unsplash";
import { FormEvent, useState } from "react";
import Loading from "@/app/loading";
import Image from "next/image";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultIsLoading, setSearchResultIsLoading] = useState(false);
  const [searchResultIsLoadingIsError, setSearchResultIsLoadingIsError] =
    useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultIsLoadingIsError(false);
        setSearchResultIsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultIsLoadingIsError(true);
      } finally {
        setSearchResultIsLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg text-bold mb-2">Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Dog, Cat ...."
            className="input input-bordered w-full max-w-xs mb-2"
          />
          <button
            className="btn btn-active btn-ghost mb-2"
            disabled={searchResultIsLoading}
          >
            Search
          </button>
        </form>

        <div>
          {searchResultIsLoading && <Loading />}
          {searchResultIsLoadingIsError && (
            <p>Something went wrong. Please Try again!</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nothing Found! Try a different word</p>
          )}
        </div>
        {searchResults && (
          <>
            {searchResults.map((image) => (
              <Image
                src={image.urls.raw}
                width={250}
                height={250}
                alt={image.description}
                key={image.urls.raw}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
