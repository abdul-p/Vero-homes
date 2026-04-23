import Link from "next/link";

import SearchBar from "@/components/SearchBar";
import StatsSection from "@/components/StatsSection";
import MapSection from "@/components/MapSection";
import PropertiesSection from "@/components/PropertiesView";
import CategoriesSection from "@/components/CategoriesSection";
import MarketStats from "@/components/Market-stats";
import Agents from "@/components/Agents";
import { ConciergeBell, Earth, House, Key } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <section className="bg-[url('/img/headbg.jpg')] bg-cover bg-center   py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-lime-100 md:text-6xl font-bold mb-6 leading-tight">
            WE BUILD THE FUTURE REAL ESTATE
          </h1>
          <p className="text-lime-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Browse thousands of verified listings across Lagos, Abuja, and Port
            Harcourt. Buy, rent, or shortlet with confidence.
          </p>

          <SearchBar />
        </div>
      </section>
      <StatsSection />
      <section className="py-12 px-4 bg-gradient-to-br from-lime-400 to-lime-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Properties Listed", value: "2,400+" },
            { label: "Cities Covered", value: "3" },
            { label: "Verified Agents", value: "180+" },
            { label: "Happy Clients", value: "1,200+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-lime-100">{stat.value}</p>
              <p className="text-sm text-lime-100 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <MapSection />
      <section className="py-16 px-4 bg-gradient-to-br from-lime-200 to-lime-700 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Browse by Type
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Find exactly what you are looking for
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "For Sale",
                type: "sale",
                icon: House,
                bg: "bg-blue-50",
                text: "text-blue-600",
              },
              {
                label: "For Rent",
                type: "rent",
                icon: Key,
                bg: "bg-green-50",
                text: "text-green-600",
              },
              {
                label: "Short Let",
                type: "shortlet",
                icon: ConciergeBell,
                bg: "bg-purple-50",
                text: "text-purple-600",
              },
              {
                label: "Land",
                type: "land",
                icon: Earth,
                bg: "bg-orange-50",
                text: "text-orange-600",
              },
            ].map((item) => {
              const Icon: React.FC<{ className?: string; size?: number }> =
                item.icon;
              return (
                <Link
                  key={item.type}
                  href={`/listings?type=${item.type}`}
                  className={`${item.bg} rounded-2xl p-6 text-center hover:shadow-md transition`}
                >
                  <Icon className={`mx-auto mb-3 ${item.text}`} size={32} />
                  <p className={`font-semibold ${item.text}`}>{item.label}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <PropertiesSection />
      <CategoriesSection />
      <section className="py-16 px-4 bg-lime-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-2">
            Top Cities
          </h2>
          <p className="text-gray-200 text-center mb-10">
            Explore properties in Nigeria's major cities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                city: "Lagos",
                description: "Nigeria's commercial capital",
                color: "from-lime-500 to-blue-600",
              },
              {
                city: "Abuja",
                description: "The federal capital territory",
                color: "from-lime-600 to-green-600",
              },
              {
                city: "Port Harcourt",
                description: "The garden city",
                color: "from-lime-800 to-purple-600",
              },
            ].map((item) => (
              <Link
                key={item.city}
                href={`/listings?city=${item.city}`}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 text-white hover:shadow-lg transition`}
              >
                <h3 className="text-2xl font-bold mb-2">{item.city}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <MarketStats />
      <Agents />
      <section className="py-20 px-4 bg-lime-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Are You a Property Agent?</h2>
          <p className="text-blue-100 mb-8">
            Join Vero Homes and reach thousands of potential buyers and tenants
            across Nigeria.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition inline-block"
          >
            List Your Property
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-lime-100 text-gray-700 py-10 px-4 text-center text-sm">
        <p className="text-black font-semibold text-lg mb-2">VeroHomes</p>
        <p>© {new Date().getFullYear()} Vero Homes. All rights reserved.</p>
        <p className="mt-2">Lagos · Abuja · Port Harcourt</p>
      </footer>
    </main>
  );
}
