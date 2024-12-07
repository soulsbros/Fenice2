import { LeafletLayer } from "@/components/leafletMap";
import Select from "@/components/select";
import {
  flagelloRossoPoints,
  itineraryPoints,
  markers,
  teleportPoints,
} from "@/lib/mapLocations";
import { capitalize } from "@/lib/utils";
import { LinesList, MapLocation } from "@/types/Map";
import { LatLngTuple } from "leaflet";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/leafletMap"), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const links = [
  { name: "Bright Age", url: "brightAge" },
  { name: "Dark Age", url: "darkAge" },
  { name: "Flagello Rosso", url: "flagelloRosso" },
  { name: "Golarion", url: "golarion" },
];

const PF_LAYERS = [
  {
    url: "https://oznogon.com/golarion-tile/tiles/{z}/{x}/{y}",
    attribution:
      'Map data &copy; <a href="https://www.dungeonetics.com/golarion-geography">John Mechalas</a>, <a href="https://paizo.com/community/communityuse">Paizo CUP</a>',
  },
  {
    url: "https://oznogon.com/golarion-tile/tiles-relief/{z}/{x}/{y}",
  },
];

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Map ${capitalize(links.filter((link) => link.url == params.id)[0]?.name || "")}`,
  };
}

export default async function SingleMapPage({ params }: Readonly<Props>) {
  let layers: LeafletLayer[] = [];
  let lines: LinesList[] = [];

  if (params.id == "brightAge") {
    layers = [
      {
        url: "https://s3.soulsbros.ch/fenice/maps/brightAge/{z}/tile_{x}_{y}.jpg",
        attribution: "Map data &copy; Sasha Toscano",
        options: {
          maxZoom: 5,
          tms: false,
          noWrap: true,
        },
      },
    ];
  } else {
    layers = PF_LAYERS;
  }

  if (params.id == "darkAge") {
    lines = [
      {
        points: itineraryPoints as LatLngTuple[][],
        options: { color: "blue" },
      },
      { points: teleportPoints as LatLngTuple[][], options: { color: "red" } },
    ];
  }

  if (params.id == "flagelloRosso") {
    lines = [
      {
        points: flagelloRossoPoints.itinerary as LatLngTuple[][],
        options: { color: "blue" },
      },
      // { points: teleportPoints as LatLngTuple[][], options: { color: "red" } },
    ];
  }

  return (
    <>
      <div className="title">
        Map{" "}
        <Select
          redirectPath="/map"
          selectedItem={params.id}
          options={links.map((el) => {
            return { name: el.name, value: el.url };
          })}
        />
      </div>

      {params.id == "brightAge" ? (
        <LeafletMap
          position={[-9.79567758282973, 6.651439946725858]}
          zoom={2}
          layers={layers}
        />
      ) : null}
      {params.id == "darkAge" ? (
        <LeafletMap
          position={[44, -10]}
          zoom={5}
          markers={markers as MapLocation[]}
          lines={lines}
          layers={layers}
        />
      ) : null}
      {params.id == "flagelloRosso" ? (
        <LeafletMap
          position={[35.24218961212739, -11.425781250000002]}
          zoom={5}
          lines={lines}
          layers={layers}
        />
      ) : null}
      {params.id == "golarion" ? (
        <iframe
          id="map"
          title="Map"
          src="https://map.pathfinderwiki.com/#location=3.76/42.98/-17.76"
          width="100%"
          height="90%"
        ></iframe>
      ) : null}
    </>
  );
}
