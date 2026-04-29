"use client";

import Link from "next/link";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { divIcon, type LatLngBoundsExpression } from "leaflet";
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

function offsetDuplicatePositions(
  items: { point: MapPoint; position: [number, number] }[],
) {
  const counts = new Map<string, number>();

  return items.map((item) => {
    const key = item.position.join(",");
    const count = counts.get(key) || 0;
    counts.set(key, count + 1);

    if (count === 0) return item;

    const angle = count * 0.85;
    const distance = 0.008 + count * 0.0015;

    return {
      ...item,
      position: [
        item.position[0] + Math.sin(angle) * distance,
        item.position[1] + Math.cos(angle) * distance,
      ] as [number, number],
    };
  });
}

const defaultIcon = divIcon({
  className: "",
  html: `<span class="property-map-marker property-map-marker-default"></span>`,
  iconSize: [30, 38],
  iconAnchor: [15, 38],
  popupAnchor: [0, -34],
});

const selectedIcon = divIcon({
  className: "",
  html: `<span class="property-map-marker property-map-marker-selected"></span>`,
  iconSize: [34, 42],
  iconAnchor: [17, 42],
  popupAnchor: [0, -38],
});

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
  const positionedPoints = useMemo(
    () =>
      offsetDuplicatePositions(
        points
          .map((point) => ({ point, position: getPointPosition(point) }))
          .filter(
            (item): item is { point: MapPoint; position: [number, number] } =>
              item.position !== null,
          ),
      ),
    [points],
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
            <Marker
              key={point.id}
              position={position}
              icon={isSelected ? selectedIcon : defaultIcon}
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
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
