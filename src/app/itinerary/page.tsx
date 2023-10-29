"use client";

import { LinesList, MapLocation } from "@/types/Map";
import {
  itineraryPoints,
  mapLocations,
  teleportPoints,
} from "@/util/mapLocations";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/leafletMap"), {
  ssr: false,
});

export default function Itinerary() {
  const lines: LinesList[] = [
    { points: itineraryPoints as LatLngTuple[][], options: { color: "blue" } },
    { points: teleportPoints as LatLngTuple[][], options: { color: "red" } },
  ];

  return (
    <LeafletMap
      position={[44, -10]}
      zoom={5}
      markers={mapLocations.itinerary as MapLocation[]}
      lines={lines}
    />
  );
}
