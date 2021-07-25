import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import './styles.css';

import { AuthContext } from '../../../context/AuthProvider/context'
import { loginHandler } from '../../../context/AuthProvider/actions'
import { isAuthenticated } from '../../../helpers/authFunctions'

function Signin() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
  const history = useHistory();

  const { dispatchAuthState } = useContext(AuthContext)
  const isAuth = isAuthenticated();

  const handleLogin = (email, password) => {
    loginHandler(dispatchAuthState, { email, password })
  }
 
  const handleChange = (event) => {
    event.preventDefault();
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;

    if (email.length && password.length) {
      handleLogin(email, password);
    }
  };

  useEffect(() => {
    if (isAuth) {
      history.push('/')
    }
  }, [isAuth, history])

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} autoComplete="off" />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
