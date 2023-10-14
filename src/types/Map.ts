import { LatLngTuple, PathOptions } from "leaflet";

export interface MapLocation {
  position: [number, number];
  name: string;
  description: string;
  marker?: string;
  dateVisited?: string;
}

export interface LinesList {
  points: LatLngTuple[] | LatLngTuple[][];
  options?: PathOptions;
}
