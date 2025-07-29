import { Trip } from "../types/types";

const rootUrl = `${
  import.meta.env.VITE_SERVER || "http://localhost:3001"
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
    else console.error("No data found.");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting trips");
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
    else console.error("No data found.");
  } catch (error) {
    console.error(error);
    throw new Error("Error posting trip");
  }
}

export async function editTrip(id: string, body: Partial<Trip>) {
  try {
    const response = await fetch(`${rootUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, response: ${errorText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating trip:", error);
    throw new Error("Error updating trip");
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, response: ${errorText}`
      );
    }

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// upload trip image to cloudinart and return url
export async function postImageToCloudinary(body: {
  file: File;
  upload_preset: string;
}): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("upload_preset", body.upload_preset);

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Error posting image");
  }
}
