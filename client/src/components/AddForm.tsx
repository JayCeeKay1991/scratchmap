import React, { useState } from "react";
import { Location } from "../types/types";
import "./AddForm.css";

interface AddFormPropType {
  selectedLocation: Location | null;
}

const AddForm = ({ selectedLocation }: AddFormPropType) => {
  const initialFormState = {
    startDate: Date,
    duration: 0,
    travellers: [],
    location: {},
  };
  const [formValues, setFormValues] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // changes in the form
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setImageFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  }

  // choosing a location by clicking on the map
  function handleLocationSelect(location: Location) {
    setFormValues((prev) => ({ ...prev, location }));
  }

  return (
    <form id="add-form-wrap">
      <h3>New trip to {selectedLocation?.coordinates}</h3>
      <label>Duration in days</label>
      <input type="number" name="duration"></input>
      <label>Travellers</label>
      <select
        multiple={true}
        value={["Sventjer", "Alex", "Luner", "Jay"]}
      ></select>
      <label>Rating</label>
      <select>
        <option value="1">⭐️</option>
        <option value="2">⭐️⭐️</option>
        <option value="3">⭐️⭐️⭐️</option>
        <option value="4">⭐️⭐️⭐️⭐️</option>
        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
      </select>

      <input id="submit-add-form" type="submit" value="Submit"></input>
    </form>
  );
};

export default AddForm;
