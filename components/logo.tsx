"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Link
      href="/"
      style={{ transition: "opacity 1.2s ease-in-out" }}
      className={`inline-flex h-12 items-center text-3xl font-extrabold leading-none cursor-pointer no-underline [text-shadow:0px_4px_10px_rgba(0,0,0,0.18)] bg-gradient-to-r from-lime-700 via-gray-900 to-lime-500 bg-clip-text text-transparent ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      VERO
    </Link>
  );
}
