import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/userServices";
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
  const [signupFailed, setSignupFailed] = useState(false);
  const [loginorSignUp, setLoginOrSignup] = useState("login");

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function signUpAndSet(formValues: FormValues) {
      const { name, password } = formValues;
      const signupData = { name, password };

      if (name && password) {
        try {
          const loggedInUser = await signup(signupData);
          if (loggedInUser) {
            setFormValues(initialState);
            setLoggedIn(true);
            navigate("/home");
            setSignupFailed(false);
          } else {
            setSignupFailed(true);
          }
        } catch (error) {
          console.error("Signup error:", error);
          setSignupFailed(true);
        }
      } else {
        setSignupFailed(true);
      }
    }
    signUpAndSet(formValues);
  };

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
      <h1>Welcome back!</h1>
      {loginFailed ? (
        <p>Wrong credentials!</p>
      ) : signupFailed ? (
        <p>Could not sign up.</p>
      ) : (
        <></>
      )}
      <form onSubmit={loginorSignUp === "login" ? handleLogin : handleSignup}>
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

        <button type="submit" id="login-signup-button">
          {loginorSignUp === "login" ? "Login" : "Sign up"}
        </button>
        <a
          onClick={() =>
            setLoginOrSignup(loginorSignUp === "login" ? "signup" : "login")
          }
          id="login-signup-anchor"
        >
          ... or {loginorSignUp === "login" ? "sign up" : "log in"}
        </a>
      </form>
    </section>
  );
};

export default Login;
