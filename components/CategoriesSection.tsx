"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const categories = [
  {
    label: "Apartment",
    value: "apartment",
    image: "/img/apartment-vero.webp",
  },
  {
    label: "Villa",
    value: "villa",
    image: "/img/vila-vero.webp",
  },
  {
    label: "Studio",
    value: "studio",
    image: "/img/studio-vero.webp",
  },
  {
    label: "Penthouse",
    value: "penthouse",
    image: "/img/penthouse-vero.webp",
  },
  { label: "Land", value: "land", image: "/img/land-vero.webp" },
];

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", value);

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Browse Property Category
            </h1>
            <p className="text-sm text-gray-500">
              Explore different property types tailored to your needs.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 -mx-4 px-4"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <div
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`
                  min-w-[280px] bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition
                  ${
                    isActive
                      ? "bg-lime-600 text-white"
                      : "bg-white text-gray-800 hover:shadow-lg"
                  }
                `}
              >
                <div className="relative w-full h-[200px] ">
                  <Image
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover rounded-top-2xl"
                    fill
                    sizes="300px"
                  />
                </div>

                <span className="flex h-9 justify-center items-center  text-sm font-medium">
                  {category.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
