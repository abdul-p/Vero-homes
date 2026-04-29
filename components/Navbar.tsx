"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import Logo from "./logo";
import NavLinks from "./Nav-links";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-lime-50/80 shadow-sm sticky top-0 z-50 h-16 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks setMenuOpen={setMenuOpen} />
          {session ? (
            <>
              {session.user.role === "agent" && (
                <Link
                  href="/agent"
                  className="text-sm text-gray-600 hover:text-lime-600 transition"
                >
                  Dashboard
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm text-gray-600 hover:text-lime-600 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-white bg-lime-600 px-4 py-2 rounded-lg hover:bg-lime-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-lime-600 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm text-white bg-lime-500 px-4 py-2 rounded-lg hover:bg-lime-600 transition"
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
        <div className="md:hidden bg-lime-100 border-t px-4 py-4 flex flex-col gap-4">
          <NavLinks setMenuOpen={setMenuOpen} />
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
                className="text-sm text-white bg-lime-600 px-4 py-2 rounded-lg"
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
                className="text-sm text-white bg-lime-500 px-4 py-2 rounded-lg text-center"
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
