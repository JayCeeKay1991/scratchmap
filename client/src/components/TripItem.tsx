import "./TripList.css";
import React, { useEffect, useState } from "react";
import { Trip } from "./../types/types";
import "./TripItem.css";

interface TripPropType {
  trip: Trip;
}

const TripItem = ({ trip }: TripPropType): React.JSX.Element => {
  return (
    <>
      <div id="trip-item-wrap">
        <h3>
          Trip to{" "}
          {trip.location ? trip.location.coordinates : "secret location"}
        </h3>
        <h4>with {trip.travellers.join(",")}</h4>
        <p>
          {trip.startDate
            ? trip.startDate.getFullYear()
            : "No date information"}
        </p>
        <p>{trip.duration} days</p>
        <p>{"⭐️".repeat(trip.rating)}</p>
        <div id="trip-buttons">
          <button id="edit">...</button>
          <button id="delete">x</button>
        </div>
      </div>
    </>
  );
};

export default TripItem;
