import React, { useState } from 'react'
import './App.css';
import ControlPanel from './ControlPanel';
import { MapContainer } from 'react-leaflet';

const App = () => {
  return (
    <div id="app-wrap" >
    <ControlPanel/>
    <MapContainer/>
    </div>
  )
}

export default App
