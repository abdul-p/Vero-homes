"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Agent = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  listingsCount: number;
};

type Listing = {
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
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function getExperience(createdAt: string) {
  const years = new Date().getFullYear() - new Date(createdAt).getFullYear();
  if (years <= 0) return "New Agent";
  return `${years} ${years === 1 ? "Year" : "Years"} Experience`;
}

export default function AgentProfilePage() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(`/api/agents/${id}`);
        const data = await res.json();
        if (res.ok) {
          setAgent(data.agent);
          setListings(data.listings || []);
        }
      } catch (error) {
        console.error("Failed to fetch agent:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAgent();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Loading agent...
      </main>
    );
  }

  if (!agent) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-500">
        <p className="mb-4 text-lg">Agent not found</p>
        <Link href="/agents" className="text-sm text-lime-700 hover:underline">
          Back to agents
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-lime-800 px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-lime-100">
            {agent.avatar ? (
              <img
                src={agent.avatar}
                alt={agent.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-lime-800">
                {agent.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <Link
              href="/agents"
              className="mb-3 inline-block text-sm text-lime-100 hover:text-white"
            >
              ← Back to agents
            </Link>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="mt-1 text-lime-100">Property Agent</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-lime-50">
              <span>{getExperience(agent.createdAt)}</span>
              <span>•</span>
              <span>
                {agent.listingsCount}{" "}
                {agent.listingsCount === 1 ? "Listing" : "Listings"}
              </span>
              {agent.phone && (
                <>
                  <span>•</span>
                  <span>{agent.phone}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Contact Details</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <p>{agent.email}</p>
            {agent.phone ? <p>{agent.phone}</p> : <p>No phone added yet.</p>}
          </div>
          <a
            href={`mailto:${agent.email}`}
            className="mt-5 block rounded-lg bg-lime-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-lime-700"
          >
            Email Agent
          </a>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Active Listings
            </h2>
            <span className="text-sm text-gray-500">
              {listings.length} {listings.length === 1 ? "property" : "properties"}
            </span>
          </div>

          {listings.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-sm">
              This agent has no approved listings yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {listings.map((listing) => (
                <Link
                  key={listing._id}
                  href={`/listings/${listing._id}`}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="h-44 bg-gray-100">
                    {listing.images?.[0] && (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex justify-between gap-3 text-xs text-gray-500">
                      <span>{listing.type}</span>
                      <span>{listing.location.city}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {listing.location.address}
                    </p>
                    <p className="font-semibold text-lime-700">
                      {formatPrice(listing.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
