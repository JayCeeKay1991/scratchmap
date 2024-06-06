import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Trip } from "./../types/types";
import "./TripItem.css";
import moment from "moment";
import { deleteTrip } from "../services/tripService";

interface TripPropType {
  trip: Trip;
  setTripList: Dispatch<SetStateAction<Trip[]>>;
}

const TripItem = ({ trip, setTripList }: TripPropType): React.JSX.Element => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  let country;
  if (trip) {
    const addressArray = trip.address?.split(",");
    country = addressArray[addressArray.length - 1];
  }

  const handleDelete = async () => {
    try {
      console.log("Deleting trip with id:", trip._id);
      await deleteTrip(trip._id);
      console.log("Trip deleted");
      setTripList((prev) => {
        const newList = prev.filter((elem) => elem._id !== trip._id);
        console.log("Updated trip list:", newList);
        return newList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initialFormState = {
    startDate: trip.startDate,
    duration: trip.duration,
    travellers: trip.travellers,
    rating: trip.rating,
    image: "",
  };

  const [formValues, setFormValues] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedTravellers, setSelectedTravellers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setImageFile(files[0]);
    } else {
      setFormValues({
        ...formValues,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTravellers((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((traveller) => traveller !== value)
    );
  };

  const handleEdit = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <div id="trip-item-wrap">
        <div id="trip-info">
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
            <button id="edit" onClick={() => setShowEdit(!showEdit)}>
              ✏️
            </button>
            <button
              id="delete"
              onClick={() => setShowConfirmDelete(!showConfirmDelete)}
            >
              🗑️
            </button>
          </div>
        </div>
        {trip.image ? <img id="trip-image" src={trip.image}></img> : <></>}
      </div>

      {showConfirmDelete ? (
        <div id="confirm-delete">
          <p>Are you sure you want to delete this trip? 🥲</p>
          <button id="confirm-delete" onClick={handleDelete}>
            ☑️
          </button>
          <button
            id="cancel-delete"
            onClick={() => setShowConfirmDelete(false)}
          >
            ✖️
          </button>
        </div>
      ) : (
        <></>
      )}
      {showEdit ? (
        <form id="edit-form" onSubmit={handleEdit}>
          <div id="edit-input">
            <label>Start date</label>
            <input
              value={formValues.startDate}
              name="startDate"
              type="date"
              onChange={changeHandler}
            ></input>
            <label>Duration</label>
            <input
              value={formValues.duration}
              name="duration"
              type="number"
              onChange={changeHandler}
            ></input>
            <label>Rating</label>
            <input
              value={formValues.rating}
              name="rating"
              type="number"
              onChange={changeHandler}
            ></input>

            <label>Image</label>
            <input
              id="upload-button"
              name="image"
              type="file"
              value={formValues.image}
              onChange={changeHandler}
            ></input>

            <label>Travellers</label>
            <div id="traveller-input">
              <label>
                <input
                  type="checkbox"
                  value="Sventjer"
                  onChange={handleCheckboxChange}
                  checked={selectedTravellers.includes("Sventjer")}
                />
                Sventjer
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Alex"
                  onChange={handleCheckboxChange}
                  checked={selectedTravellers.includes("Alex")}
                />
                Alex
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Luner"
                  onChange={handleCheckboxChange}
                  checked={selectedTravellers.includes("Luner")}
                />
                Luner
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Jay"
                  onChange={handleCheckboxChange}
                  checked={selectedTravellers.includes("Jay")}
                />
                Jay
              </label>
            </div>
          </div>
          <button id="submit-edit-form" type="submit">
            Save
          </button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default TripItem;
