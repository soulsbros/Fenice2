import { itineraryPoints, markers, teleportPoints } from "@/lib/mapLocations";
import { LinesList, MapLocation } from "@/types/Map";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MapButtonsProps {
  map: string;
}

const MapButtons = ({ map }: MapButtonsProps) => {
  return (
    <>
      <Link
        href="/map/brightAge"
        className={`${map === "brightAge" ? "secondary" : "primary"} button`}
      >
        Bright Age
      </Link>
      <Link
        href="/map/darkAge"
        className={`${map === "darkAge" ? "secondary" : "primary"} button`}
      >
        Dark Age
      </Link>
      <Link
        href="/map/golarion"
        className={`${map === "golarion" ? "secondary" : "primary"} button`}
      >
        Golarion
      </Link>
    </>
  );
};

export default async function SingleMapPage({
  params,
}: Readonly<{
  params: { map: string };
}>) {
  if (params.map == "brightAge") {
    return (
      <>
        <MapButtons map={params.map} />
        <Image
          src="https://lafenice.soulsbros.ch/img/mappe/The%20Bright%20Age%20-%20Vegras'%20Archipelago.jpg"
          alt="Map"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </>
    );
  }

  if (params.map == "darkAge") {
    const LeafletMap = dynamic(() => import("@/components/leafletMap"), {
      ssr: false,
    });

    const lines: LinesList[] = [
      {
        points: itineraryPoints as LatLngTuple[][],
        options: { color: "blue" },
      },
      { points: teleportPoints as LatLngTuple[][], options: { color: "red" } },
    ];

    return (
      <>
        <MapButtons map={params.map} />
        <LeafletMap
          position={[44, -10]}
          zoom={5}
          markers={markers as MapLocation[]}
          lines={lines}
        />
      </>
    );
  }

  if (params.map == "golarion") {
    return (
      <>
        <MapButtons map={params.map} />
        <iframe
          id="map"
          title="Map"
          src="https://map.pathfinderwiki.com/#location=3.76/42.98/-17.76"
          width="100%"
          height="90%"
        ></iframe>
      </>
    );
  }

  return notFound();
}
