"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

interface Listing {
  _id: string;
  title: string;
  type: string;
  category: string;
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

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set(e.target.name, e.target.value);
    } else {
      params.delete(e.target.name);
    }

    router.push(`/listings?${params.toString()}`);
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());

      const res = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();

      setListings(data.listings || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

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

  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400">Loading...</div>
      }
    >
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
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-6 shadow-sm mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <select
                name="city"
                value={searchParams.get("city") || ""}
                onChange={handleInputChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="maxPrice"
                value={searchParams.get("maxPrice") || ""}
                onChange={handleInputChange}
                placeholder="Max Price"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="bedrooms"
                value={searchParams.get("bedrooms") || ""}
                onChange={handleInputChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimeout(fetchListings, 0);
                }}
                className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Results */}
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              Loading listings...
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No listings found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {listings.length} propert{listings.length === 1 ? "y" : "ies"}{" "}
                found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Link
                    key={listing._id}
                    href={`/listings/${listing._id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* Image */}
                    <div className="bg-gray-100 h-48 flex items-center justify-center">
                      {listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-400 text-sm">No image</p>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${typeBadge[listing.type]}`}
                        >
                          {typeLabel[listing.type]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {listing.location.city}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-1">
                        {listing.location.address}
                      </p>

                      <p className="text-blue-600 font-bold text-lg">
                        {formatPrice(listing.price)}
                      </p>

                      <span className="text-xs text-gray-500">
                        {listing.category}
                      </span>

                      {listing.bedrooms && (
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>{listing.bedrooms} bed</span>
                          {listing.bathrooms && (
                            <span>{listing.bathrooms} bath</span>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-3">
                        Agent: {listing.agent.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </Suspense>
  );
}
