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
      className={`text-[2rem] font-bold cursor-pointer no-underline  [text-shadow:0px_4px_10px_rgba(0,0,0,0.5)] bg-gradient-to-r from-[var(--color-section-bg)] via-[var(--color-dark)] to-[var(--color-primary)] bg-clip-text text-transparent ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      VERO
    </Link>
  );
}
