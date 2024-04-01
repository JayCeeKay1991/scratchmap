import {useEffect} from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

const MapEffect = () => {
  const map = useMap();

  useMapEvents({
    click: () => map.locate(),
    locationfound: (location) => {
      console.log('location found:', location)
    },
  })

  useEffect(() => {
    console.log('Using map! 🗺️');
  }, [map]);

  return null;
};

export default MapEffect;