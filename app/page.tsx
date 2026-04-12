import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect Property in Nigeria
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Browse thousands of verified listings across Lagos, Abuja, and Port
            Harcourt. Buy, rent, or shortlet with confidence.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto shadow-lg">
            <select className="flex-1 px-4 py-3 text-gray-700 text-sm rounded-xl focus:outline-none">
              <option value="">All Cities</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
            <select className="flex-1 px-4 py-3 text-gray-700 text-sm rounded-xl focus:outline-none">
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="shortlet">Short Let</option>
              <option value="land">Land</option>
            </select>
            <Link
              href="/listings"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition text-center"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-4 border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Properties Listed", value: "2,400+" },
            { label: "Cities Covered", value: "3" },
            { label: "Verified Agents", value: "180+" },
            { label: "Happy Clients", value: "1,200+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Browse by Type
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Find exactly what you are looking for
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "For Sale", type: "sale", emoji: "🏠", bg: "bg-blue-50", text: "text-blue-600" },
              { label: "For Rent", type: "rent", emoji: "🔑", bg: "bg-green-50", text: "text-green-600" },
              { label: "Short Let", type: "shortlet", emoji: "🛎️", bg: "bg-purple-50", text: "text-purple-600" },
              { label: "Land", type: "land", emoji: "🌍", bg: "bg-orange-50", text: "text-orange-600" },
            ].map((item) => (
              <Link
                key={item.type}
                href={`/listings?type=${item.type}`}
                className={`${item.bg} rounded-2xl p-6 text-center hover:shadow-md transition`}
              >
                <p className="text-4xl mb-3">{item.emoji}</p>
                <p className={`font-semibold ${item.text}`}>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Top Cities
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Explore properties in Nigeria's major cities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { city: "Lagos", description: "Nigeria's commercial capital", color: "from-blue-400 to-blue-600" },
              { city: "Abuja", description: "The federal capital territory", color: "from-green-400 to-green-600" },
              { city: "Port Harcourt", description: "The garden city", color: "from-purple-400 to-purple-600" },
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
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
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-center text-sm">
        <p className="text-white font-semibold text-lg mb-2">VeroHomes</p>
        <p>© {new Date().getFullYear()} Vero Homes. All rights reserved.</p>
        <p className="mt-2">Lagos · Abuja · Port Harcourt</p>
      </footer>
    </main>
  );
}
