"use client";

import dynamic from "next/dynamic";

import type { MapPoint } from "./map-utils";

const LeafletPropertyMap = dynamic(() => import("./LeafletPropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
      Loading map...
    </div>
  ),
});

type PropertyMapProps = {
  points: MapPoint[];
  selectedId?: string | null;
  className?: string;
  zoom?: number;
};

export default function PropertyMap(props: PropertyMapProps) {
  return <LeafletPropertyMap {...props} />;
}
