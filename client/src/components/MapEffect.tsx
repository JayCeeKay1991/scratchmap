import { Dispatch, SetStateAction } from "react";
import { useMapEvents } from "react-leaflet";
import { Location } from "./../types/types";

interface MapEffectPropType {
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
}

const MapEffect = ({
  setSelectedLocation,
  setShowAddForm,
}: MapEffectPropType) => {
  const map = useMapEvents({
    click: () => map.locate(),
    locationfound: (location) => {
      console.log("location found:", location);
      setSelectedLocation({
        type: "Point",
        coordinates: [location.latlng.lng, location.latlng.lat],
      });
      setShowAddForm(true);
    },
  });

  return null;
};

export default MapEffect;
