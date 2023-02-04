import React, { useState } from "react";
import { Button } from "@mui/material";
import InputComponent from "../helpers/InputComponent";
import loginStyles from "../Styles/loginStyles";

const initialState = {
  username: "",
  password: ""
};

function LoginForm() {
  const classes = loginStyles();
  const [loginData, setLoginData] = useState(initialState);
  const [inputErrors, setInputErrs] = useState({});

  const handler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (value) {
      setInputErrs({ ...inputErrors, [name]: "" });
    }
  };

  const validateLogin = (values) => {
    const errors = {};
    switch (true) {
    case (values.username === ""):
      errors.username = "Username is required, Your registered email is your username";
      break;

    case (values.password === ""):
      errors.password = "Please enter password";
      break;

    default:
      break;
    }
    return errors;
  };

  const onLogin = (e) => {
    setInputErrs(validateLogin(loginData));
    e.preventDefault();
  };
  return (
    <div className={classes.loginForm}>
      <form onSubmit={onLogin}>
        <InputComponent type="text" label="Username" name="username" value={loginData.username} formErrors={inputErrors?.username} handler={(e) => handler(e)} />
        <br />
        <InputComponent type="password" label="Password" name="password" value={loginData.password} formErrors={inputErrors?.password} handler={(e) => handler(e)} />
        <br />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
