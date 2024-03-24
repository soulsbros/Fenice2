import { itineraryPoints, markers, teleportPoints } from "@/lib/mapLocations";
import { LinesList, MapLocation } from "@/types/Map";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

const LeafletMap = dynamic(() => import("@/components/leafletMap"), {
  ssr: false,
});

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
    const layers = [
      {
        url: "https://lafenice.soulsbros.ch/img/mappe/brightAge/{z}/tile_{x}_{y}.jpg",
        attribution: "Map data &copy; Sasha Toscano",
        options: {
          maxZoom: 5,
          tms: false,
          noWrap: true,
        },
      },
    ];

    return (
      <>
        <MapButtons map={params.map} />
        <LeafletMap
          position={[-9.79567758282973, 6.651439946725858]}
          zoom={2}
          layers={layers}
        />
      </>
    );
  }

  if (params.map == "darkAge") {
    const lines: LinesList[] = [
      {
        points: itineraryPoints as LatLngTuple[][],
        options: { color: "blue" },
      },
      { points: teleportPoints as LatLngTuple[][], options: { color: "red" } },
    ];

    const layers = [
      {
        url: "https://oznogon.com/golarion-tile/tiles/{z}/{x}/{y}",
        attribution:
          'Map data &copy; <a href="https://www.dungeonetics.com/golarion-geography">John Mechalas</a>, <a href="https://paizo.com/community/communityuse">Paizo CUP</a>',
      },
      {
        url: "https://oznogon.com/golarion-tile/tiles-relief/{z}/{x}/{y}",
      },
    ];

    return (
      <>
        <MapButtons map={params.map} />
        <LeafletMap
          position={[44, -10]}
          zoom={5}
          markers={markers as MapLocation[]}
          lines={lines}
          layers={layers}
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
