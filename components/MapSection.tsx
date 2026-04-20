"use client";

export default function MapSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <div className="w-full h-[400px] lg:h-[500px] rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">
          Map will go here
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-card space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Interactive Property Map
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Navigate the real estate landscape with our interactive map.
              Discover properties, view details, and find your dream home with
              ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Price</label>
              <input
                type="text"
                placeholder="Enter price range"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Bedrooms</label>
              <input
                type="text"
                placeholder="Bedrooms"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Bathrooms</label>
              <input
                type="text"
                placeholder="Bathrooms"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <button className="w-full bg-lime-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-lime-700 transition flex items-center justify-center gap-2">
            🔍 Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}
