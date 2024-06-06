import React, { useState } from "react";
import App from "./App";
import Login from "./Login";

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return !loggedIn ? <Login setLoggedIn={setLoggedIn}></Login> : <App></App>;
};

export default Root;
