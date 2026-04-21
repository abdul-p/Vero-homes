"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Property {
  _id: string;
  title: string;
  type: string;
  price: number;
  location: {
    city: string;
    address: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  agent: {
    name: string;
    email: string;
  };
}

export default function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    type: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const scrollRef = useRef<HTMLUListElement>(null);

  // ✅ Fetch Properties
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.type) params.append("type", filters.type);
        if (filters.city) params.append("city", filters.city);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);

        const res = await fetch(`/api/listings?${params.toString()}`);
        const data = await res.json();

        setProperties(data.listings || []);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured <span className="text-lime-600">Properties</span> From
            Around The Globe
          </h1>
          <p className="text-sm text-gray-500">
            Discover premium spaces tailored for modern living and working
            across top locations.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            →
          </button>
        </div>

        {/* STATES */}
        {loading && (
          <p className="text-center text-gray-500">Loading properties...</p>
        )}

        {!loading && properties.length === 0 && (
          <p className="text-center text-gray-500">No properties found</p>
        )}

        {/* CAROUSEL */}
        {!loading && properties.length > 0 && (
          <ul
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {properties.map((property) => (
              <li
                key={property._id}
                className="min-w-[280px] bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src={property.images?.[0] || "/img/headbg.jpg"} // ✅ FIXED
                    alt={property.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-semibold">{property.title}</h2>
                    <span className="text-xs text-gray-500">
                      {property.type}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    {property.location.city}
                  </p>

                  <p className="text-sm font-medium text-lime-600">
                    ₦{property.price.toLocaleString()}
                  </p>

                  <div className="flex justify-between text-xs text-gray-500 pt-2">
                    <span>{property.bedrooms ?? 0} beds</span>
                    <span>{property.bathrooms ?? 0} baths</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
