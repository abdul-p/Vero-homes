"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Agent = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  listingsCount: number;
};

function getExperience(createdAt: string) {
  const years = new Date().getFullYear() - new Date(createdAt).getFullYear();
  if (years <= 0) return "New Agent";
  return `${years} ${years === 1 ? "Year" : "Years"} Experience`;
}

export default function AgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/agents?limit=8");
        const data = await res.json();
        setAgents(data.agents || []);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Meet Our Top Agents
            </h1>
            <Link
              href="/agents"
              className="mt-2 inline-block text-sm font-medium text-lime-700 hover:text-lime-800"
            >
              View all agents
            </Link>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              aria-label="Scroll agents left"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              aria-label="Scroll agents right"
            >
              →
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No agents are available yet.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="min-w-[260px] bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-soft transition"
              >
                <div className="flex h-[200px] items-center justify-center bg-lime-100">
                  {agent.avatar ? (
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-lime-600 text-3xl font-bold text-white">
                      {agent.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {agent.name}
                    </h2>
                    <p className="text-xs text-gray-500">Property Agent</p>
                  </div>

                  <div className="flex justify-between gap-3 text-xs text-gray-500">
                    <span>{getExperience(agent.createdAt)}</span>
                    <span>
                      {agent.listingsCount}{" "}
                      {agent.listingsCount === 1 ? "Listing" : "Listings"}
                    </span>
                  </div>

                  <Link
                    href={`/agents/${agent._id}`}
                    className="block text-center text-sm font-medium text-lime-600 hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
