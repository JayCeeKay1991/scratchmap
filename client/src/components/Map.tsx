import React from 'react';
import { useMap, Marker, TileLayer } from 'react-leaflet'
import './Map.css';
import MapContainerComp from './MapContainer';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultPosition = [50.5, 13.5];

const Map = () => {
  const map = useMap();
  console.log('Map center:', map.getCenter())

  return (
    <>
    <MapContainerComp center={defaultPosition} zoom={13}>
      <Marker position={defaultPosition}>
        <p>Placeholder text.</p>
      </Marker>
    </MapContainerComp>
    </>
  )
}

export default Map;
