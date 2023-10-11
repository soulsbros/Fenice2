"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../../components/leafletMap"), {
  ssr: false,
});

export default function Itinerary() {
  return <LeafletMap position={[47.428545, -7.69043]} zoom={5} />;
}
