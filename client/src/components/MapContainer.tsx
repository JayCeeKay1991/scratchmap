import "./MapContainer.css";
import { LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapEffect from "./MapEffect";

type MapContainerProps = {
  children: React.ReactNode;
  center: LatLngTuple;
  zoom: number;
};

const MapContainerComp = ({ center, zoom, children }: MapContainerProps) => {
  return (
    <div id="map-wrap">
      <MapContainer id="map-container" center={center} zoom={zoom}>
        {children}
      </MapContainer>
    </div>
  );
};

export default MapContainerComp;
