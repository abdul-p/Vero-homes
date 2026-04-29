"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import PropertyMap from "@/components/PropertyMap";
import type { MapPoint } from "@/components/map-utils";

interface Listing {
  _id: string;
  title: string;
  type: string;
  category: string;
  price: number;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  agent: {
    name: string;
    email: string;
  };
}

export default function ListingsClient() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Convert URL params → API query
  const buildQuery = () => searchParams.toString();

  // Fetch listings
  const fetchListings = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/listings?${buildQuery()}`);
      const data = await res.json();

      setListings(data.listings || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever URL changes
  useEffect(() => {
    fetchListings();
  }, [searchParams.toString()]);

  // Handle filter change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set(e.target.name, e.target.value);
    } else {
      params.delete(e.target.name);
    }

    router.push(`/listings?${params.toString()}`);
  };

  // Clear filters
  const handleClear = () => {
    router.push("/listings");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  const typeLabel: Record<string, string> = {
    sale: "For Sale",
    rent: "For Rent",
    shortlet: "Short Let",
    land: "Land",
  };

  const typeBadge: Record<string, string> = {
    sale: "bg-blue-100 text-blue-700",
    rent: "bg-green-100 text-green-700",
    shortlet: "bg-purple-100 text-purple-700",
    land: "bg-orange-100 text-orange-700",
  };

  const mapPoints: MapPoint[] = listings.map((listing) => ({
    id: listing._id,
    title: listing.title,
    price: listing.price,
    href: `/listings/${listing._id}`,
    city: listing.location.city,
    address: listing.location.address,
    coordinates: listing.location.coordinates,
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Property Listings</h1>
          <p className="text-blue-100">
            Find your perfect property across Nigeria
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white rounded-2xl p-6 shadow-sm mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              name="city"
              value={searchParams.get("city") || ""}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Cities</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>

            <select
              name="type"
              value={searchParams.get("type") || ""}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="shortlet">Short Let</option>
              <option value="land">Land</option>
            </select>

            <input
              type="number"
              name="minPrice"
              value={searchParams.get("minPrice") || ""}
              onChange={handleInputChange}
              placeholder="Min Price"
              className="border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="number"
              name="maxPrice"
              value={searchParams.get("maxPrice") || ""}
              onChange={handleInputChange}
              placeholder="Max Price"
              className="border rounded-lg px-3 py-2 text-sm"
            />

            <select
              name="bedrooms"
              value={searchParams.get("bedrooms") || ""}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm">
              Search
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="border px-6 py-2 rounded-lg text-sm"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">No listings found</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid md:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <Link
                  key={listing._id}
                  href={`/listings/${listing._id}`}
                  className="bg-white rounded-xl overflow-hidden shadow"
                >
                  <div className="h-48 bg-gray-100">
                    {listing.images[0] && (
                      <img
                        src={listing.images[0]}
                        className="w-full h-full object-cover"
                        alt={listing.title}
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded ${typeBadge[listing.type]}`}
                      >
                        {typeLabel[listing.type]}
                      </span>
                      <span className="text-xs text-gray-400">
                        {listing.location.city}
                      </span>
                    </div>

                    <h3 className="font-semibold mt-2">{listing.title}</h3>
                    <p className="text-sm text-gray-500">
                      {listing.location.address}
                    </p>

                    <p className="text-blue-600 font-bold mt-2">
                      {formatPrice(listing.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
              <PropertyMap
                points={mapPoints}
                className="h-[420px] shadow lg:h-full"
              />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
