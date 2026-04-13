import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Vero Homes</h1>
          <p className="text-blue-100 text-lg">
            Nigeria's trusted platform for finding, listing, and managing
            properties across Lagos, Abuja, and Port Harcourt.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We believe finding a home should be simple, transparent, and
            trustworthy. Vero Homes connects verified property agents with
            serious buyers and tenants across Nigeria's major cities, making
            the property search process faster and more reliable for everyone.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Why Choose Vero Homes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "✅",
                title: "Verified Listings",
                description:
                  "Every listing goes through admin review before going live. No fake or misleading properties.",
              },
              {
                emoji: "🔒",
                title: "Secure Platform",
                description:
                  "Your data is protected. We never share your personal information with third parties.",
              },
              {
                emoji: "⚡",
                title: "Fast & Easy",
                description:
                  "Search, filter, and contact agents in minutes. No complicated processes or hidden fees.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <p className="text-4xl mb-4">{item.emoji}</p>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2,400+", label: "Properties Listed" },
            { value: "3", label: "Cities Covered" },
            { value: "180+", label: "Verified Agents" },
            { value: "1,200+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Home?</h2>
          <p className="text-blue-100 mb-8">
            Browse thousands of verified listings across Nigeria today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/listings"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition"
            >
              Browse Listings
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              List a Property
            </Link>
          </div>
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
