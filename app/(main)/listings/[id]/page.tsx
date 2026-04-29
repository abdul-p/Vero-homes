"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PropertyMap from "@/components/PropertyMap";
import type { MapPoint } from "@/components/map-utils";

interface Listing {
  _id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  location: {
    city: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  agent: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  status: string;
  createdAt: string;
}

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();
        setListing(data.listing);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const handleInquiryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiry, listingId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setInquiryError(data.message);
        return;
      }

      setInquirySuccess(true);
      setInquiry({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setInquiryError("Something went wrong. Please try again.");
    } finally {
      setInquiryLoading(false);
    }
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

  const mapPoint: MapPoint | null = listing
    ? {
        id: listing._id,
        title: listing.title,
        price: listing.price,
        city: listing.location.city,
        address: listing.location.address,
        coordinates: listing.location.coordinates,
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading listing...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg mb-4">Listing not found</p>
        <Link href="/listings" className="text-blue-600 hover:underline text-sm">
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/listings"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-gray-100 h-72 flex items-center justify-center">
                {listing.images.length > 0 ? (
                  <img
                    src={listing.images[activeImage]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400">No images available</p>
                )}
              </div>

              {listing.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {listing.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      onClick={() => setActiveImage(index)}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition ${
                        activeImage === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${typeBadge[listing.type]}`}
                  >
                    {typeLabel[listing.type]}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-800 mt-2">
                    {listing.title}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {listing.location.address}, {listing.location.city}
                  </p>
                </div>
                <p className="text-blue-600 font-bold text-2xl whitespace-nowrap">
                  {formatPrice(listing.price)}
                </p>
              </div>

              {(listing.bedrooms || listing.bathrooms) && (
                <div className="flex gap-6 py-4 border-y border-gray-100 mb-4">
                  {listing.bedrooms && (
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800">
                        {listing.bedrooms}
                      </p>
                      <p className="text-xs text-gray-400">Bedrooms</p>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800">
                        {listing.bathrooms}
                      </p>
                      <p className="text-xs text-gray-400">Bathrooms</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h2 className="font-semibold text-gray-800 mb-2">
                  Description
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {listing.description}
                </p>
              </div>
            </div>

            {mapPoint && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-gray-800">Location</h2>
                  <p className="text-sm text-gray-500">
                    {listing.location.address}, {listing.location.city}
                  </p>
                </div>
                <PropertyMap
                  points={[mapPoint]}
                  selectedId={listing._id}
                  className="h-[360px]"
                  zoom={12}
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">
                Listed by
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {listing.agent.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {listing.agent.name}
                  </p>
                  <p className="text-xs text-gray-400">Property Agent</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p>📧 {listing.agent.email}</p>
                {listing.agent.phone && <p>📞 {listing.agent.phone}</p>}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">
                Send an Inquiry
              </h2>

              {inquirySuccess ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm text-center">
                  Your inquiry has been sent successfully. The agent will contact you soon.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  {inquiryError && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                      {inquiryError}
                    </div>
                  )}

                  <input
                    type="text"
                    name="name"
                    value={inquiry.name}
                    onChange={handleInquiryChange}
                    placeholder="Your name"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={inquiry.email}
                    onChange={handleInquiryChange}
                    placeholder="Your email"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={inquiry.phone}
                    onChange={handleInquiryChange}
                    placeholder="Your phone (optional)"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="message"
                    value={inquiry.message}
                    onChange={handleInquiryChange}
                    placeholder="I am interested in this property..."
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {inquiryLoading ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
