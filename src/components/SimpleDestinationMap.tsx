"use client";

import { Button } from "./ui/button";
import { Globe, MapPin, Navigation } from "lucide-react";

interface SimpleDestinationMapProps {
  center: [number, number];
  destinationName: string;
  venues?: Array<{
    id: number | string;
    name: string;
    location: string;
    rating: number;
  }>;
}

export function SimpleDestinationMap({
  center,
  destinationName,
  venues = [],
}: SimpleDestinationMapProps) {
  const [lat, lng] = center;
  // const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.1},${lat - 0.1},${lng + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lng}`;
  // const mapUrl = `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${lat},${lng}&zoom=13`;
  const DELTA = 3;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lng - DELTA
  },${lat - DELTA},${lng + DELTA},${lat + DELTA}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200"
        style={{ zIndex: 1 }}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          style={{ border: 0 }}
          title={`Map of ${destinationName}`}
        />
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap gap-6 p-4 bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] flex items-center justify-center text-white text-xs">
            📍
          </div>
          <span className="text-sm font-medium">Main Destination</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-[#DF6951] flex items-center justify-center text-[#DF6951] text-xs">
            1
          </div>
          <span className="text-sm font-medium">Wedding Venues</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Navigation className="size-4 text-[#DF6951]" />
          <span className="text-sm text-muted-foreground">
            Interactive map view
          </span>
        </div>
      </div>

      {/* Map Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="flex-1 min-w-[200px]"
          onClick={() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`;
            window.open(url, "_blank");
          }}
        >
          <Globe className="mr-2 size-4" />
          Open in Google Maps
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-w-[200px]"
          onClick={() => {
            window.location.reload();
          }}
        >
          <MapPin className="mr-2 size-4" />
          Recenter Map
        </Button>
      </div>

      {/* Coordinates Info */}
      <div className="text-center p-3 bg-white border border-gray-200 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Coordinates:{" "}
          <span className="font-mono font-medium text-foreground">
            {center[0].toFixed(4)}°N, {center[1].toFixed(4)}°E
          </span>
        </p>
      </div>
    </div>
  );
}
