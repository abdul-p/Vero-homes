"use client";

import { useEffect, useMemo, useState } from "react";

type HomeStats = {
  propertiesListed: number;
  citiesCovered: number;
  verifiedAgents: number;
  happyClients: number;
};

const emptyStats: HomeStats = {
  propertiesListed: 0,
  citiesCovered: 0,
  verifiedAgents: 0,
  happyClients: 0,
};

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function StatItem({ label, value }: { label: string; value: number }) {
  const count = useCountUp(value);

  return (
    <div>
      <p className="text-3xl font-bold text-lime-100">
        {count.toLocaleString()}
      </p>
      <p className="text-sm text-lime-100 mt-1">{label}</p>
    </div>
  );
}

export default function HomeStatsCounter() {
  const [stats, setStats] = useState<HomeStats>(emptyStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        if (res.ok) {
          setStats({
            propertiesListed: data.propertiesListed || 0,
            citiesCovered: data.citiesCovered || 0,
            verifiedAgents: data.verifiedAgents || 0,
            happyClients: data.happyClients || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch homepage stats:", error);
      }
    };

    fetchStats();
  }, []);

  const items = useMemo(
    () => [
      { label: "Properties Listed", value: stats.propertiesListed },
      { label: "Cities Covered", value: stats.citiesCovered },
      { label: "Verified Agents", value: stats.verifiedAgents },
      { label: "Happy Clients", value: stats.happyClients },
    ],
    [stats],
  );

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-lime-400 to-lime-900">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((stat) => (
          <StatItem key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
