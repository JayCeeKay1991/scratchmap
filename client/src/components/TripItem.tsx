import React, { Dispatch, SetStateAction } from "react";
import { Trip } from "./../types/types";
import "./TripItem.css";
import moment from "moment";
import { deleteTrip } from "../services/tripService";

interface TripPropType {
  trip: Trip;
  setTripList: Dispatch<SetStateAction<Trip[]>>;
}

const TripItem = ({ trip, setTripList }: TripPropType): React.JSX.Element => {
  let country;
  if (trip) {
    const addressArray = trip.address?.split(",");
    country = addressArray[addressArray.length - 1];
  }

  const handleDelete = async () => {
    try {
      async function deleteAndSet(id: string) {
        await deleteTrip(id);
        setTripList((prev) => prev.filter((elem) => elem._id !== trip._id));
      }
      deleteAndSet(trip._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="trip-item-wrap">
        <h3>Trip to {trip ? country : "secret location"}</h3>
        <h4>with {trip.travellers.join(", ")}</h4>
        <p>
          {trip.startDate
            ? `${moment(trip.startDate).format("MMM YYYY")}`
            : "No date information"}
        </p>
        <p>{trip.duration} days</p>
        <p>{`${"⭐️".repeat(trip.rating)}`}</p>
        <div id="trip-buttons">
          <button id="edit">...</button>
          <button id="delete" onClick={handleDelete}>
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default TripItem;
