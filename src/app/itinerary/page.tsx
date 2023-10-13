"use client";

import { MapLocation } from "@/types/Map";
import { mapLocations } from "@/util/mapLocations";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../../components/leafletMap"), {
  ssr: false,
});

export default function Itinerary() {
  return (
    <LeafletMap
      position={[44, -10]}
      zoom={5}
      markers={mapLocations.itinerary as MapLocation[]}
    />
  );
}
