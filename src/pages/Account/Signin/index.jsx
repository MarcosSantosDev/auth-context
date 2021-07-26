import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import { AuthContext } from "../../../context/AuthProvider/context";
import { loginHandler } from "../../../context/AuthProvider/actions";

function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { authState, dispatchAuthState } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    loginHandler(dispatchAuthState, { email, password });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;

    if (email.length && password.length) {
      handleLogin(email, password);
    }
  };

  useEffect(() => {
    const isAuthenticated = authState.auth.isAuthenticated;

    if (isAuthenticated) {
      history.push("/");
    }
  }, [authState.auth.isAuthenticated, history]);

  return (
    <div className="container">
      <div className="signin-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" onChange={handleChange} />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            autoComplete="off"
          />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
