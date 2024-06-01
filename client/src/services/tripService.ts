import { Trip } from "../types/types";

const rootUrl = `${
  /*import.meta.env.VITE_SERVER || */ "http://localhost:3003"
}/trips`;

const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;

// get all trips from database
export async function getAllTrips() {
  try {
    const response = await fetch(rootUrl, {
      method: "GET",
    });
    const data = await response.json();
    if (data) return data;
    else console.log("No data found.");
  } catch (error) {
    console.error(error);
  }
}

// post a trip to list
export async function postTrip(body: Partial<Trip>) {
  try {
    const response = await fetch(rootUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data) return data;
    else console.log("No data found.");
  } catch (error) {
    console.error(error);
  }
}

// delete a trip from list
export async function deleteTrip(id: string) {
  try {
    const response = await fetch(rootUrl + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postImageToCloudinary(body: {
  file: File;
  upload_preset: string;
}): Promise<string> {
  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("error posting image");
  }
}
