import { LatLngTuple } from "leaflet";

// Berlin as a fallback
export const defaultLocationObj = {
  lat: 52.507389,
  lng: 13.378096
}
export const defaultLocationTuple: LatLngTuple = [
  52.507389, 13.378096
]

export function fetchUserLocation(setLocation: (location: {lat: number, lng: number}) => void) {
  if ("geolocation" in navigator) {
    //console.log('Here!', navigator);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        //console.log('🦋', latitude, longitude);
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLocation(defaultLocationObj);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    setLocation(defaultLocationObj);
  }
}