import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { login } from "../services/userServices";
import "./Login.css";

export type FormValues = {
  name: string;
  password: string;
};

const initialState = {
  name: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>(initialState);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function logInAndSet(formValues: FormValues) {
      const { name, password } = formValues;
      const loginData = { name, password };
      if (name && password) {
        const loggedInUser = await login(loginData);
      }

      setFormValues(initialState);
      navigate("/home");
    }
    logInAndSet(formValues);
  };

  return (
    <section id="login-wrap">
      <h1>Hi 😍</h1>
      <form>
        <input type="email" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <button id="login-button">
          <FaArrowAltCircleRight size={30}></FaArrowAltCircleRight>
        </button>
      </form>
    </section>
  );
};

export default Login;
