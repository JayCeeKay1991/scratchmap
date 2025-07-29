export function fetchUserLocation(
  setLocation: (location: { lat: number; lng: number }) => void
) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        throw new Error("Error getting location");
        setLocation({ lat: 0, lng: 0 });
      }
    );
  } else {
    setLocation({ lat: 0, lng: 0 });
    throw new Error("Geolocation is not supported by this browser.");
  }
}
