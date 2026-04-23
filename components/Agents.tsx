"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Agent = {
  id: number;
  name: string;
  role: string;
  experience: string;
  listings: string;
  image: string;
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Luxury Real Estate Specialist",
    experience: "8 Years Experience",
    listings: "20 Listings",
    image: "/img/agent-1.jpg",
  },
  {
    id: 2,
    name: "Michael Ade",
    role: "Commercial Property Expert",
    experience: "6 Years Experience",
    listings: "15 Listings",
    image: "/img/agent-2.jpg",
  },
  {
    id: 3,
    name: "Chioma Okafor",
    role: "Residential Specialist",
    experience: "5 Years Experience",
    listings: "18 Listings",
    image: "/img/agent-3.jpg",
  },
  {
    id: 4,
    name: "David Bello",
    role: "Investment Consultant",
    experience: "10 Years Experience",
    listings: "30 Listings",
    image: "/img/agent-4.jpg",
  },
];

export default function AgentsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Meet Our Top Agents
          </h1>

          {/* CONTROLS */}
          <div className="flex gap-2">
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
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="min-w-[260px] bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-soft transition"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="p-4 space-y-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {agent.name}
                  </h2>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                </div>

                {/* STATS */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{agent.experience}</span>
                  <span>{agent.listings}</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/agents/${agent.id}`}
                  className="block text-center text-sm font-medium text-lime-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
