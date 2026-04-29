"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };
  return (
    <footer className="bg-lime-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto border-b border-gray-800 px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">VeroHomes</h2>
          <p className="text-sm text-gray-400">
            Find your perfect property with ease.
          </p>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="text-white font-bold mb-4">
            Subscribe to our newsletter
          </h3>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-lime-600 px-6 py-3 rounded-lg text-white font-medium hover:bg-lime-700 transition"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>

          {/* Feedback */}
          {status === "success" && (
            <p className="text-green-400 text-sm mt-2">
              Successfully subscribed 🎉
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm mt-2">
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">VeroHomes</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover, explore, and secure your dream property with ease.
            VeroHomes helps you find the perfect place across Nigeria.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/listings" className="hover:text-white transition">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/buy" className="hover:text-white transition">
                Buy Property
              </Link>
            </li>
            <li>
              <Link href="/rent" className="hover:text-white transition">
                Rent Property
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/listings?type=sale"
                className="hover:text-white transition"
              >
                For Sale
              </Link>
            </li>
            <li>
              <Link
                href="/listings?type=rent"
                className="hover:text-white transition"
              >
                For Rent
              </Link>
            </li>
            <li>
              <Link
                href="/listings?type=shortlet"
                className="hover:text-white transition"
              >
                Short Let
              </Link>
            </li>
            <li>
              <Link
                href="/listings?type=land"
                className="hover:text-white transition"
              >
                Land
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Lagos, Nigeria</li>
            <li>Email: support@verohomes.com</li>
            <li>Phone: +234 800 000 0000</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <span className="hover:text-white cursor-pointer">
              <Image
                className="hover:text-lime-500 cursor-pointer"
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </span>
            <span className="hover:text-white cursor-pointer">
              <Image
                className="hover:text-lime-500 cursor-pointer"
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </span>
            <span className="hover:text-white cursor-pointer">
              <Image
                className="hover:text-lime-500 cursor-pointer"
                src="/x.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </span>
            <span className="hover:text-white cursor-pointer">
              <Image
                className="hover:text-lime-500 cursor-pointer"
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500">
        © {new Date().getFullYear()} VeroHomes. All rights reserved.
      </div>
    </footer>
  );
}
