import React, {useState, useEffect} from 'react'
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainerComp from './MapContainer';
import { TileLayer, Marker, useMapEvents } from "react-leaflet"
import { defaultLocationObj, defaultLocationTuple, fetchUserLocation } from '../services/locationService';
import { LocationObj } from '../types/types';

const App = () => {

  const initialState = {
    startDate: Date,
    duration: 0,
    travellers: [],
    location: {}
  }

  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultLocationTuple);
  const [location, setLocation] = useState(defaultLocationObj);
  const [formValues, setFormValues] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);

  // changes in the form
  function changeHandler(e) {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  }

  // choosing a location by clicking on the map
  function handleLocationSelect (location:LocationObj) {
    setFormValues((prev) => ({ ...prev, location }));
  };


  // set the map center to the current location
  useEffect(() => {
    const getLocationAndSet = async () => {
      await fetchUserLocation(setLocation);
      setMapCenter([location.lat, location.lng]);
    }
    getLocationAndSet()
  },
  []);


  return (
    <div id="app-wrap" >
      <ControlPanel/>
      <MapContainerComp zoom={10} center={mapCenter} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        <Marker position={mapCenter}></Marker>
      </MapContainerComp>
    </div>
  )
}

export default App
