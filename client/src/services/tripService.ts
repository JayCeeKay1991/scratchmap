import { Trip } from "../types/types";

const rootUrl = `${
  /*import.meta.env.VITE_SERVER || */ "http://localhost:3003"
}/trips`;

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
