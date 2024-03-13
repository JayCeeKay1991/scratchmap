import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import './Map.css';
import Map from "./Map";

type MapContainerProps = {
 children: React.JSX.Element
}

const MapContainerComp = ({children}:MapContainerProps) => {
  return (
    <MapContainer>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
      {children}
    </MapContainer>
  )
}

export default MapContainerComp;