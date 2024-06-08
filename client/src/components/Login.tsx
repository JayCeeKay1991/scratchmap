import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { login } from "../services/userServices";
import "./Login.css";

export type FormValues = {
  name: string;
  password: string;
};

type LoginPropsType = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  name: "",
  password: "",
};

const Login = ({ setLoggedIn }: LoginPropsType) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [loginFailed, setLoginFailed] = useState(false);

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
        try {
          const loggedInUser = await login(loginData);
          if (loggedInUser) {
            setFormValues(initialState);
            setLoggedIn(true);
            navigate("/home");
            setLoginFailed(false);
          } else {
            setLoginFailed(true);
          }
        } catch (error) {
          console.error("Login error:", error);
          setLoginFailed(true);
        }
      } else {
        setLoginFailed(true);
      }
    }
    logInAndSet(formValues);
  };

  return (
    <section id="login-wrap">
      <h1>Hi 😍</h1>
      {loginFailed ? <p>Wrong credentials!</p> : <></>}
      <form onSubmit={handleLogin}>
        <input
          type="name"
          name="name"
          placeholder="name"
          onChange={changeHandler}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={changeHandler}
        ></input>

        <button type="submit" id="login-button">
          <FaArrowAltCircleRight size={30}></FaArrowAltCircleRight>
        </button>
      </form>
    </section>
  );
};

export default Login;
