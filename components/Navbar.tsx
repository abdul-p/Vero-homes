
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Vero<span className="text-gray-800">Homes</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-sm text-gray-600 hover:text-blue-600 transition">
            Listings
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition">
            About
          </Link>

          {session ? (
            <>
              {session.user.role === "agent" && (
                <Link
                  href="/agent"
                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          <Link
            href="/listings"
            className="text-sm text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Listings
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {session ? (
            <>
              {session.user.role === "agent" && (
                <Link
                  href="/agent"
                  className="text-sm text-gray-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm text-gray-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}