import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-5xl mx-auto shadow-xl space-y-6">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-900">
          Find the best place for you
        </p>
        {/* <h2 className="text-xl font-semibold text-gray-900">
          Search Properties
        </h2> */}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500">
          <option value="">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
          <option value="shortlet">Short Let</option>
          <option value="land">Land</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
        />

        <select className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500">
          <option value="">All Cities</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Port Harcourt">Port Harcourt</option>
        </select>

        <input
          type="text"
          placeholder="Rooms"
          className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </form>

      <div className="flex justify-end">
        <Link
          href="/listings"
          className="bg-lime-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-lime-700 transition"
        >
          Search Properties
        </Link>
      </div>
    </div>
  );
}
