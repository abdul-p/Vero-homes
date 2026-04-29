export type MapPoint = {
  id: string;
  title: string;
  price?: number;
  href?: string;
  city?: string;
  address?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
};

export const cityCoordinates: Record<string, [number, number]> = {
  Lagos: [6.5244, 3.3792],
  Abuja: [9.0765, 7.3986],
  "Port Harcourt": [4.8156, 7.0498],
};

export const nigeriaCenter: [number, number] = [7.8, 5.2];

export function getPointPosition(point: MapPoint): [number, number] | null {
  const lat = point.coordinates?.lat;
  const lng = point.coordinates?.lng;

  if (typeof lat === "number" && typeof lng === "number") {
    return [lat, lng];
  }

  if (point.city && cityCoordinates[point.city]) {
    return cityCoordinates[point.city];
  }

  return null;
}

export function formatMapPrice(price?: number) {
  if (!price) return "";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}
