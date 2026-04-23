"use client";

import Link from "next/link";

export default function MarketPreview() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            🏡 Market Reality Snapshot
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Get the latest insights on Nigeria’s property market. Know where
            prices are rising, where to invest, and how fast homes are selling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition">
            <h3 className="text-2xl font-bold text-lime-600">₦75M</h3>
            <p className="text-sm text-gray-500 mt-1">Avg. Home Price</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition">
            <h3 className="text-2xl font-bold text-lime-600">22 Days</h3>
            <p className="text-sm text-gray-500 mt-1">Avg. Time on Market</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition">
            <h3 className="text-2xl font-bold text-lime-600">6.2%</h3>
            <p className="text-sm text-gray-500 mt-1">
              Top Rental Yield (Lekki)
            </p>
          </div>
        </div>

        <div>
          <Link
            href="/market"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-lime-600 px-6 py-3 rounded-xl hover:bg-lime-700 transition"
          >
            View Full Market Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
