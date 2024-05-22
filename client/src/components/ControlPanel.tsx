import React, { Dispatch, SetStateAction } from "react";
import "./ControlPanel.css";
import AddForm from "./AddForm";
import { Location, Trip } from "../types/types";
import TripItem from "./TripItem";

type ControlPanelProps = {
  showAddForm: boolean;
  list: Trip[];
  setTripList: Dispatch<SetStateAction<Trip[]>>;
  selectedLocation: Location | null;
  selectedAddress: string | null;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  showAddForm,
  setTripList,
  list,
  selectedLocation,
  selectedAddress,
}) => {
  return (
    <div id="panel-wrap">
      <h1>Trips Trips Trips 💜💙🤎💚</h1>
      {showAddForm === true ? (
        <AddForm
          selectedLocation={selectedLocation}
          selectedAddress={selectedAddress}
          setTripList={setTripList}
        />
      ) : (
        "Click the map to add a trip!"
      )}
      {list && list.length ? (
        list.map((trip) => (
          <TripItem
            trip={trip}
            setTripList={setTripList}
            key={trip._id}
          ></TripItem>
        ))
      ) : (
        <p>No trips yet.</p>
      )}
      <p id="footer">For my besties.</p>
    </div>
  );
};

export default ControlPanel;
