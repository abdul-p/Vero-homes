"use client";

import Link from "next/link";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import { useEffect, useMemo } from "react";

import {
  formatMapPrice,
  getPointPosition,
  nigeriaCenter,
  type MapPoint,
} from "./map-utils";

type LeafletPropertyMapProps = {
  points: MapPoint[];
  selectedId?: string | null;
  className?: string;
  zoom?: number;
};

function FitMapToPoints({ points }: { points: MapPoint[] }) {
  const map = useMap();
  const positions = useMemo(
    () => points.map(getPointPosition).filter(Boolean) as [number, number][],
    [points],
  );

  useEffect(() => {
    if (positions.length === 0) {
      map.setView(nigeriaCenter, 6);
      return;
    }

    if (positions.length === 1) {
      map.setView(positions[0], 12);
      return;
    }

    map.fitBounds(positions as LatLngBoundsExpression, {
      padding: [32, 32],
      maxZoom: 13,
    });
  }, [map, positions]);

  return null;
}

export default function LeafletPropertyMap({
  points,
  selectedId,
  className = "",
  zoom = 6,
}: LeafletPropertyMapProps) {
  const positionedPoints = points
    .map((point) => ({ point, position: getPointPosition(point) }))
    .filter(
      (item): item is { point: MapPoint; position: [number, number] } =>
        item.position !== null,
    );

  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <MapContainer
        center={nigeriaCenter}
        zoom={zoom}
        scrollWheelZoom
        className="h-full min-h-[320px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMapToPoints points={points} />

        {positionedPoints.map(({ point, position }) => {
          const isSelected = selectedId === point.id;

          return (
            <CircleMarker
              key={point.id}
              center={position}
              radius={isSelected ? 11 : 8}
              pathOptions={{
                color: isSelected ? "#1d4ed8" : "#3f6212",
                fillColor: isSelected ? "#2563eb" : "#65a30d",
                fillOpacity: 0.9,
                weight: 3,
              }}
            >
              <Popup>
                <div className="min-w-44 space-y-1 text-sm">
                  <p className="font-semibold text-gray-900">{point.title}</p>
                  {(point.address || point.city) && (
                    <p className="text-xs text-gray-500">
                      {[point.address, point.city].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {point.price && (
                    <p className="font-semibold text-lime-700">
                      {formatMapPrice(point.price)}
                    </p>
                  )}
                  {point.href && (
                    <Link
                      href={point.href}
                      className="inline-block text-xs font-medium text-blue-600 hover:underline"
                    >
                      View listing
                    </Link>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
