import React, { useState } from "react";
import "./ControlPanel.css";
import AddForm from "./AddForm";
import { Location, Trip } from "../types/types";
import TripItem from "./TripItem";

type ControlPanelProps = {
  showAddForm: boolean;
  list: Trip[];
  selectedLocation: Location | null;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  showAddForm,
  list,
  selectedLocation,
}) => {
  return (
    <div id="panel-wrap">
      <h1>Trips Trips Trips 💜💙🤎💚</h1>
      {showAddForm === true ? (
        <AddForm selectedLocation={selectedLocation} />
      ) : (
        "Click the map to add a trip!"
      )}
      {list && list.length ? (
        list.map((trip) => <TripItem trip={trip} key={trip._id}></TripItem>)
      ) : (
        <p>No trips yet.</p>
      )}
    </div>
  );
};

export default ControlPanel;
