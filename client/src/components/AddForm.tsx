import React, { useState, Dispatch, SetStateAction } from "react";
import { Location, Trip } from "../types/types";
import "./AddForm.css";
import { postTrip } from "../services/tripService";
import { AiFillCloseCircle } from "react-icons/ai";
import { postImageToCloudinary } from "../services/tripService";
const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

interface AddFormPropType {
  selectedLocation: Location | null;
  selectedAddress: string | null;
  setTripList: Dispatch<SetStateAction<Trip[]>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
}

const AddForm = ({
  selectedLocation,
  selectedAddress,
  setTripList,
  setShowAddForm,
}: AddFormPropType) => {
  const initialFormState = {
    startDate: new Date(),
    duration: 0,
    travellers: [],
    rating: 0,
    location: selectedLocation,
    address: selectedAddress,
    image: "",
  };
  const [formValues, setFormValues] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedTravellers, setSelectedTravellers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  // changes in the form
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await postImageToCloudinary({
          file: imageFile,
          upload_preset: cloudinaryPreset,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedLocation && formValues.startDate && formValues.travellers) {
      const newTripData = {
        ...formValues,
        travellers: selectedTravellers,
        rating: selectedRating,
        image: imageUrl,
        location: {
          type: "Point",
          coordinates: [
            selectedLocation.coordinates[1],
            selectedLocation.coordinates[0],
          ],
        },
        address: selectedAddress || "",
      };
      try {
        const newTrip = await postTrip(newTripData);
        setTripList((prev) => [...prev, newTrip]);
        setFormValues(initialFormState);
        setShowAddForm(false);
        setImageFile(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form id="add-form-wrap" onSubmit={handleSubmit}>
      <h3>New trip to {selectedAddress}</h3>
      <div id="form-input-fields">
        <label>Start</label>
        <input type="date" name="startDate" onChange={changeHandler}></input>
        <label>Duration in days</label>
        <input type="number" name="duration" onChange={changeHandler} />

        <label>Rating</label>
        <select
          value={selectedRating}
          onChange={(e) => {
            setSelectedRating(Number(e.target.value));
          }}
        >
          <option value={1}>⭐️</option>
          <option value={2}>⭐️⭐️</option>
          <option value={3}>⭐️⭐️⭐️</option>
          <option value={4}>⭐️⭐️⭐️⭐️</option>
          <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
        </select>

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
              onChange={handleCheckboxChange}
            />
            Sventjer
          </label>
          <label>
            <input
              type="checkbox"
              value="Alex"
              onChange={handleCheckboxChange}
            />
            Alex
          </label>
          <label>
            <input
              type="checkbox"
              value="Luner"
              onChange={handleCheckboxChange}
            />
            Luner
          </label>
          <label>
            <input
              type="checkbox"
              value="Jay"
              onChange={handleCheckboxChange}
            />
            Jay
          </label>
        </div>
      </div>

      <input id="submit-add-form" type="submit" value="Submit" />
      <button id="cancel-add" onClick={() => setShowAddForm(false)}>
        <AiFillCloseCircle
          color="var(--theme-grey-medium)"
          size={25}
        ></AiFillCloseCircle>
      </button>
    </form>
  );
};

export default AddForm;
