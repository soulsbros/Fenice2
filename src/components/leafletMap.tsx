"use client";

import { LinesList, MapLocation } from "@/types/Map";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

interface LeafletMapProps {
  position: [number, number];
  zoom: number;
  markers?: MapLocation[];
  lines?: LinesList[];
}

export default function LeafletMap({
  position,
  zoom,
  markers = [],
  lines = [],
}: LeafletMapProps) {
  const mapOptions = {
    tms: true,
    updateWhenIdle: false,
    updateInterval: 50,
    keepBuffer: 4,
    maxZoom: 9,
  };

  const markersList = markers.map((el) => (
    <Marker position={el.position} key={el.name + el.dateVisited}>
      <Popup>
        <b>{el.name}</b>
        <br />
        <i>{el.description}</i>
        <br />
        Visited: {el.dateVisited}
      </Popup>
    </Marker>
  ));

  const linesList = lines.map((el) => (
    <Polyline
      key={el.points.toString()}
      pathOptions={el.options}
      positions={el.points}
    />
  ));

  return (
    <MapContainer center={position} zoom={zoom} className="h-full">
      <TileLayer
        attribution='Map data &copy; <a href="https://www.dungeonetics.com/golarion-geography">John Mechalas</a>, <a href="https://paizo.com/community/communityuse">Paizo CUP</a>'
        url="https://oznogon.com/golarion-tile/tiles/{z}/{x}/{y}"
        {...mapOptions}
      />
      <TileLayer
        url="https://oznogon.com/golarion-tile/tiles-relief/{z}/{x}/{y}"
        {...mapOptions}
        opacity={0.4}
        maxNativeZoom={6}
      />
      {markersList}
      {linesList}
    </MapContainer>
  );
}
