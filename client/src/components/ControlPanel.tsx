import React, { useState } from "react";
import './ControlPanel.css';
import TripList from "./TripList";

const ControlPanel = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div id="panel-wrap" >
    <h1>Trips Trips Trips 💜💙🤎💚</h1>
    <TripList/>
    <p>Click the map to add a trip!</p>
    </div>
  )
}

export default ControlPanel;