export function fetchUserLocation(
  setLocation: (location: { lat: number; lng: number }) => void
) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        //console.log('🦋', latitude, longitude);
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLocation({ lat: 0, lng: 0 });
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    setLocation({ lat: 0, lng: 0 });
  }
}
