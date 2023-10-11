"use client";

import { mapLocations } from "@/util/mapLocations";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function LeafletMap(props: any) {
  const { position, zoom } = props;

  const fullLocationList = mapLocations.lore
    .concat(mapLocations.itinerary)
    .concat(mapLocations.futureItinerary);

  const mapOptions = {
    tms: true,
    updateWhenIdle: false,
    updateInterval: 50,
    keepBuffer: 4,
    maxZoom: 9,
  };

  const markersList = fullLocationList.map((el) => (
    <Marker position={[el.position[0], el.position[1]]} key={el.name}>
      <Popup>
        <b>{el.name}</b>
        <br />
        {el.description}
      </Popup>
    </Marker>
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
    </MapContainer>
  );
}
