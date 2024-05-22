import { Dispatch, SetStateAction, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { Location } from "./../types/types";
import axios from "axios";

interface MapEffectPropType {
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<string | null>>;
}

const MapEffect = ({
  setSelectedLocation,
  setAddress,
  setShowAddForm,
}: MapEffectPropType) => {
  const map = useMapEvents({
    load: () => map.locate(),
    locationfound: (userLocation) => {
      map.setView([userLocation.latlng.lat, userLocation.latlng.lng], 4);
    },
    click: async (selectedLocation) => {
      setSelectedLocation({
        type: "Point",
        coordinates: [selectedLocation.latlng.lat, selectedLocation.latlng.lng],
      });
      setShowAddForm(true);

      // Fetch address from the Nominatim API
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.latlng.lat}&lon=${selectedLocation.latlng.lng}`
      );

      if (response.data && response.data.display_name) {
        setAddress(response.data.display_name);
      } else {
        console.log("Address not found");
      }
    },
  });

  return null;
};

export default MapEffect;
