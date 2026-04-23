import Link from "next/link";

export default function NavLinks(setMenuOpen?: (open: boolean) => void) {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="/listings"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen(false)}
      >
        Listings
      </Link>
      <Link
        href="/buy"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen(false)}
      >
        Buy
      </Link>
      <Link
        href="/rent"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen(false)}
      >
        Rent
      </Link>
      <Link
        href="/about"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen(false)}
      >
        About
      </Link>
    </div>
  );
}
