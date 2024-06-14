import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Trip } from "./../types/types";
import "./TripItem.css";
import moment from "moment";
import { deleteTrip, editTrip } from "../services/tripService";
import { postImageToCloudinary } from "../services/tripService";
const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

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
    startDate: moment(new Date(trip.startDate)).format("YYYY-MM-DD"),
    duration: trip.duration,
    travellers: trip.travellers,
    rating: trip.rating,
    image: trip.image,
    location: trip.location,
    address: trip.address,
  };

  const [formValues, setFormValues] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      setImageFile(files[0]);
    } else if (type === "checkbox") {
      setFormValues((prevValues) => {
        const newTravellers = checked
          ? [...prevValues.travellers, value]
          : prevValues.travellers.filter((traveller) => traveller !== value);
        return { ...prevValues, travellers: newTravellers };
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await postImageToCloudinary({
          file: imageFile,
          upload_preset: cloudinaryPreset,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    const newTrip = {
      ...formValues,
      image: imageUrl || formValues.image,
      travellers: formValues.travellers,
      startDate: new Date(formValues.startDate),
    };

    try {
      const updatedTrip = await editTrip(trip._id, newTrip);
      if (updatedTrip) {
        setTripList((list) =>
          list.map((elem) => (elem._id === trip._id ? updatedTrip : elem))
        );
        setFormValues(initialFormState);
        setShowEdit(false);
      } else {
        console.error("Failed to update trip");
      }
    } catch (error) {
      console.error("Error editing trip:", error);
    }
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
              onChange={changeHandler}
            ></input>

            <label>Travellers</label>
            <div id="traveller-input">
              <label>
                <input
                  type="checkbox"
                  value="Sventjer"
                  onChange={changeHandler}
                  checked={formValues.travellers.includes("Sventjer")}
                />
                Sventjer
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Alex"
                  onChange={changeHandler}
                  checked={formValues.travellers.includes("Alex")}
                />
                Alex
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Luner"
                  onChange={changeHandler}
                  checked={formValues.travellers.includes("Luner")}
                />
                Luner
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Jay"
                  onChange={changeHandler}
                  checked={formValues.travellers.includes("Jay")}
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
