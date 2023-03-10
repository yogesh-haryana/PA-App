import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import loginStyles from "../Styles/loginStyles";
import { loadingData, lodingSuccess, lodingFailed } from "../Redux/actions";

const initialState = {
  username: "",
  password: ""
};

function LoginForm() {
  const classes = loginStyles();
  const [loginData, setLoginData] = useState(initialState);
  const [inputErrors, setInputErrs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
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
    case (values.username === ""):
      errors.username = "Username is required, Your registered email is your username";
      validationStatus = false;
      break;

    case (values.password === ""):
      errors.password = "Please enter password";
      validationStatus = false;
      break;

    default:
      break;
    }
    setInputErrs(errors);
    return validationStatus;
  };

  const authLogin = () => {
    const url = `http://localhost:8080/api/users/verified?username=${loginData.username}&password=${loginData.password}`;
    dispatch(loadingData());
    axios.get(url)
      .then((resp) => {
        const users = resp.data;
        if (users.length === 1) {
          const LoggedInUser = users[0];
          dispatch(lodingSuccess(LoggedInUser));
          localStorage.setItem("user", JSON.stringify(LoggedInUser));
          setLoginData(initialState);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        dispatch(lodingFailed(error.message));
      });
  };

  const onLogin = (e) => {
    if (validateLogin(loginData) === true) {
      authLogin();
    }
    e.preventDefault();
  };
  return (
    <div className={classes.loginForm}>
      <Link type="button" className={classes.adminLoginBtn} to="/adminLogin">Admin Login</Link>
      <p className={classes.heading}>PERFORMANCE APPRAISAL</p>
      <form onSubmit={onLogin}>
        <InputComponent type="text" label="Username" name="username" value={loginData.username} formErrors={inputErrors?.username} handler={(e) => handler(e)} />
        <br />
        <InputComponent type="password" label="Password" name="password" value={loginData.password} formErrors={inputErrors?.password} handler={(e) => handler(e)} />
        <br />
        <Button type="submit" variant="contained">Login</Button>
      </form>
      <p>
        Not registered with us..
        {" "}
        <Link to="/register">Signup here</Link>
      </p>
    </div>
  );
}

export default LoginForm;
