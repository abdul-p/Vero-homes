"use client";

import Image from "next/image";

export default function StatsSection() {
  return (
    <section className="py-20 px-4 bg-background text-text">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Your primary home might begin to feel left out.
          </h1>

          <div className="relative rounded-2xl overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[300px] object-cover"
            >
              <source src="/img/vero-vid.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <p className="text-white text-sm">
                Explore the world of real estate with Vero, it's more than a
                move. It's coming home.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative w-full h-[250px] rounded-2xl overflow-hidden">
            <Image
              src="/img/stats-2.jpg"
              alt="Interior"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">
              Big things can happen in small spaces.
            </h2>
            <p className="text-sm text-text-muted">
              With thoughtful design and smart organisation, you can maximize
              every inch, making room for creativity.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm hover:opacity-90 transition">
              Details
            </button>
          </div>
        </div>
        <div className="bg-surface space-y-4 rounded-2xl  p-4 shadow-card    transition hover:shadow-soft">
          <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
            <Image
              src="/img/stats-1.jpg"
              alt="City property"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">From $256k</p>

            <span className="text-xs text-gray-500">Modern Homes</span>
          </div>

          <button className="w-full bg-lime-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-lime-700 transition">
            Explore Properties
          </button>
        </div>
        <div className="flex items-center justify-between gap-6 text-sm text-text-muted mt-6">
          <p className="flex-1 leading-relaxed">
            Whether it's creating a cozy corner for relaxation or transforming a
            small area into a workspace.
          </p>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-full border border-border hover:bg-gray-100 transition">
              ←
            </button>
            <button className="p-2.5 rounded-full border border-border hover:bg-gray-100 transition">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
