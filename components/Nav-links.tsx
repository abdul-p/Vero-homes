import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="/listings"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
      >
        Listings
      </Link>
      <Link
        href="/buy"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
      >
        Buy
      </Link>
      <Link
        href="/rent"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
      >
        Rent
      </Link>
      <Link
        href="/about"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
      >
        About
      </Link>
    </div>
  );
}
