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

      <input type="number" name="duration" placeholder="duration"></input>

      <input type="number" name="duration" placeholder="duration"></input>

      <input type="number" name="rating" placeholder="rating"></input>
    </form>
  );
};

export default AddForm;
