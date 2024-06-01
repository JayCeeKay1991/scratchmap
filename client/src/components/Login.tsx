import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function logInAndSet() {
      navigate("/home");
    }
    logInAndSet();
  };

  return (
    <section id="login-wrap">
      <h1>Hi 😍</h1>
      <form>
        <input type="email" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <Link to={`/home`} id="login-button">
          <FaArrowAltCircleRight size={30}></FaArrowAltCircleRight>
        </Link>
      </form>
    </section>
  );
};

export default Login;
