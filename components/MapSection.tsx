"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PropertyMap from "./PropertyMap";
import type { MapPoint } from "./map-utils";

type Listing = {
  _id: string;
  title: string;
  price: number;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
};

export default function MapSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState({
    city: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });

  useEffect(() => {
    const fetchListings = async () => {
      const params = new URLSearchParams();

      if (filters.city) params.set("city", filters.city);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
      if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
      if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);

      try {
        const res = await fetch(`/api/listings?${params.toString()}`);
        const data = await res.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error("Failed to fetch map listings:", error);
      }
    };

    fetchListings();
  }, [filters.city, filters.maxPrice, filters.bedrooms, filters.bathrooms]);

  const points: MapPoint[] = useMemo(
    () =>
      listings.map((listing) => ({
        id: listing._id,
        title: listing.title,
        price: listing.price,
        href: `/listings/${listing._id}`,
        city: listing.location.city,
        address: listing.location.address,
        coordinates: listing.location.coordinates,
      })),
    [listings],
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 px-4 bg-lime-200">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <PropertyMap
          points={points}
          className="h-[400px] w-full shadow-sm lg:h-[500px]"
        />

        <div className="bg-white rounded-2xl p-6 shadow-card space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Interactive Property Map
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Navigate the real estate landscape with our interactive map.
              Discover properties, view details, and find your dream home with
              ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Location</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="">All cities</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Enter max price"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                placeholder="Bedrooms"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                placeholder="Bathrooms"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <button className="w-full bg-lime-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-lime-700 transition flex items-center justify-center gap-2">
            <Search size={16} aria-hidden="true" />
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}
