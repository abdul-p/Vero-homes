"use client";

import { useEffect, useState } from "react";
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

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/agents");
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

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-lime-800 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Property Agents</h1>
          <p className="mt-2 max-w-2xl text-lime-100">
            Connect with verified agents and view their active property
            listings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {loading ? (
          <p className="py-20 text-center text-gray-500">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="py-20 text-center text-gray-500">
            No agents are available yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Link
                key={agent._id}
                href={`/agents/${agent._id}`}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-48 items-center justify-center bg-lime-100">
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

                <div className="space-y-3 p-5">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {agent.name}
                    </h2>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{getExperience(agent.createdAt)}</span>
                    <span>
                      {agent.listingsCount}{" "}
                      {agent.listingsCount === 1 ? "Listing" : "Listings"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
