import { FormValues } from "../components/Login";
import { User } from "../types/types";

const rootUrl = `${
  import.meta.env.VITE_SERVER || "http://localhost:3003"
}/login`;

export async function login(body: FormValues): Promise<User> {
  try {
    const response = await fetch(`${rootUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error logging in");
  }
}
