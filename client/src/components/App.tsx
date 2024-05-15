import React, { useState, useEffect } from "react";
import "./App.css";
import ControlPanel from "./ControlPanel";
import MapContainerComp from "./MapContainer";
import { TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import {
  defaultLocationObj,
  defaultLocationTuple,
  fetchUserLocation,
} from "../services/locationService";
import MapEffect from "./MapEffect";
import { getAllTrips } from "../services/tripService";
import { Trip } from "../types/types";
import { Location } from "../types/types";

const App = () => {
  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultLocationTuple);
  const [location, setLocation] = useState(defaultLocationObj);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);

  // set the map center to the current location
  useEffect(() => {
    const getLocationAndSet = async () => {
      await fetchUserLocation(setLocation);
      setMapCenter([location.lat, location.lng]);
    };
    getLocationAndSet();
  }, []);

  const [tripList, setTripList] = useState<Trip[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      const updatedTrips = await getAllTrips();
      setTripList(updatedTrips);
    }
    fetchAndSet();
  });

  useEffect(() => {
    console.log("📍", selectedLocation);
  }, [selectedLocation]);

  return (
    <div id="app-wrap">
      <ControlPanel
        showAddForm={showAddForm}
        list={tripList}
        selectedLocation={selectedLocation}
      />
      <MapContainerComp zoom={5} center={mapCenter}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {tripList.length ? (
          tripList.map((trip) => (
            <Marker
              key={trip._id}
              position={trip.location?.coordinates || mapCenter}
              eventHandlers={{
                click: () => {
                  console.log("marker clicked");
                },
              }}
            >
              <Popup>
                {trip.rating} <br /> {trip.duration}
              </Popup>
            </Marker>
          ))
        ) : (
          <></>
        )}
        <MapEffect
          setSelectedLocation={setSelectedLocation}
          setShowAddForm={setShowAddForm}
        />
      </MapContainerComp>
    </div>
  );
};

export default App;
