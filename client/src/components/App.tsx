import React, { useState, useEffect } from "react";
import "./App.css";
import ControlPanel from "./ControlPanel";
import MapContainerComp from "./MapContainer";
import L from "leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapEffect from "./MapEffect";
import { getAllTrips } from "../services/tripService";
import { Trip } from "../types/types";
import { Location } from "../types/types";
import moment from "moment";

// Fixing marker icon issue
const defaultIcon = L.icon({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Apply the default icon to all markers
L.Marker.prototype.options.icon = defaultIcon;

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [tripList, setTripList] = useState<Trip[]>([]);
  const [address, setAddress] = useState<string | null>(null);

  // get the list of trips
  useEffect(() => {
    async function fetchAndSet() {
      const updatedTrips = await getAllTrips();
      setTripList(updatedTrips);
    }
    fetchAndSet();
  }, []);

  return (
    <>
      <div id="app-wrap">
        <ControlPanel
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          list={tripList}
          setTripList={setTripList}
          selectedLocation={selectedLocation}
          selectedAddress={address}
        />
        <MapContainerComp zoom={2} center={[0, 0]}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          {tripList && tripList.length ? (
            tripList.map((trip) =>
              trip.location ? (
                <Marker
                  key={trip._id + "a"}
                  position={[
                    trip.location?.coordinates[1],
                    trip.location?.coordinates[0],
                  ]}
                >
                  <Popup>
                    {moment(trip.startDate).format("MMM YYYY")} <br />{" "}
                    {`${trip.duration} days with ${trip.travellers.join(", ")}`}
                  </Popup>
                </Marker>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
          {selectedLocation && showAddForm ? (
            <Marker
              position={[
                selectedLocation.coordinates[0],
                selectedLocation.coordinates[1],
              ]}
            ></Marker>
          ) : (
            <></>
          )}
          <MapEffect
            setSelectedLocation={setSelectedLocation}
            setShowAddForm={setShowAddForm}
            setAddress={setAddress}
          />
        </MapContainerComp>
      </div>
    </>
  );
};

export default App;
