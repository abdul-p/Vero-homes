import Link from "next/link";

type NavLinksProps = {
  setMenuOpen?: (open: boolean) => void;
};

export default function NavLinks({ setMenuOpen }: NavLinksProps) {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="/listings"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen?.(false)}
      >
        Listings
      </Link>
      <Link
        href="/listings?type=sale"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen?.(false)}
      >
        Buy
      </Link>
      <Link
        href="/listings?type=rent"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen?.(false)}
      >
        Rent
      </Link>
      <Link
        href="/about"
        className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition"
        onClick={() => setMenuOpen?.(false)}
      >
        About
      </Link>
    </div>
  );
}
