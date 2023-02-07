import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import InputComponent from "../helpers/InputComponent";
import loginStyles from "../Styles/loginStyles";

const initialState = {
  username: "",
  password: ""
};

function AdminLogin() {
  const classes = loginStyles();
  const [loginData, setLoginData] = useState(initialState);
  const [inputErrors, setInputErrs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      navigate("/admin");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (value) {
      setInputErrs({ ...inputErrors, [name]: "" });
    }
  };

  const validateLogin = (values) => {
    let validationStatus = true;
    const errors = {};
    switch (true) {
    case (values.username === "" && values.username !== "admin"):
      errors.username = "Please enter correct username.";
      validationStatus = false;
      break;

    case (values.password === "" && values.password !== "admin00"):
      errors.password = "Please enter correct password";
      validationStatus = false;
      break;

    default:
      break;
    }
    setInputErrs(errors);
    return validationStatus;
  };

  const onLogin = (e) => {
    if (validateLogin(loginData) === true) {
      localStorage.setItem("admin", JSON.stringify(loginData));
      navigate("/admin");
    }
    e.preventDefault();
  };
  return (
    <div className={classes.loginForm}>
      <p className={classes.heading}>Welcome Back, ADMIN</p>
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

export default AdminLogin;
