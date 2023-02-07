import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import SelectComp from "../helpers/SelectComp";
import registrationStyles from "../Styles/RegistrationStyles";
import request from "../helpers/httpHelper";

const initialState = {
  fullName: "",
  email: "",
  empId: "",
  officeLoc: "",
  department: "",
  password: "",
  confrmPswrd: ""
};

function Registration() {
  const classes = registrationStyles();
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [apiResp, setApiResp] = useState({});
  const [successMsg, setMsg] = useState("");
  // const [isErrExist, setErrExist] = useState(false);

  const patterns = {
    fullName: "^[A-Za-z]{3,16}$",
    email: "^[a-zA-Z0-9_.+-]+@celestialsys.com$",
    empId: "^[0-9][0-9][0-9]$",
    password: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)(?!.* ).{6,15}$",
    confrmPswrd: formData.password
  };

  const officeLocArr = ["Noida", "WTC", "Jayanagar"];
  const departmentArr = ["FE", "BE", "QA", "DevOps", "HR", "Operation", "IT"];

  const Validate = (values) => {
    let validationStatus = true;
    const errors = {};
    switch (true) {
    case (values.fullName === ""):
      errors.fullName = "Name is required";
      validationStatus = false;
      break;

    case (!(values.fullName).match(patterns.fullName)):
      errors.fullName = "Full name should be 3-16 chars, no special characters";
      validationStatus = false;
      break;

    case (values.email === ""):
      errors.email = "Email is required";
      validationStatus = false;
      break;

    case (!(values.email).match(patterns.email)):
      errors.email = "Email should be company's provided";
      validationStatus = false;
      break;

    case (values.empId === ""):
      errors.empId = "Employee id is required";
      validationStatus = false;
      break;

    case (!(values.empId).match(patterns.empId)):
      errors.empId = "Employee Id should be a 3-digit number only";
      validationStatus = false;
      break;

    case (values.officeLoc === ""):
      errors.officeLoc = "Office location is required";
      validationStatus = false;
      break;

    case (values.department === ""):
      errors.department = "Department id is required";
      validationStatus = false;
      break;

    case (values.password === ""):
      errors.password = "Password is required";
      validationStatus = false;
      break;

    case (!(values.password).match(patterns.password)):
      errors.password = "Password must be 6-15 characters with 1 uppercase, 1 lowercase, and 1 special character";
      validationStatus = false;
      break;

    case (values.confrmPswrd === ""):
      errors.confrmPswrd = "Re enter your Password";
      validationStatus = false;
      break;

    case (!(values.confrmPswrd).match(patterns.confrmPswrd)):
      errors.confrmPswrd = "Passwords doesn't matches";
      validationStatus = false;
      break;

    default:
      break;
    }
    setFormErrors(errors);
    return validationStatus;
  };

  const showSuccessMsg = () => {
    setMsg("Signup success, this may take up to 24 hrs to approve");
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  const showUnSuccessMsg = () => {
    setMsg("Email and Employee Id must be unique for all users");
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  const postFormData = async () => {
    const url = "http://localhost:8080/api/users/";
    const method = "POST";
    const data = formData;
    const response = await request(url, method, data);
    setApiResp(response);
  };

  const handler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Validate(formData) === true) {
      postFormData();
      if (apiResp.status === 200) {
        setFormData({ ...initialState });
        showSuccessMsg();
      } else {
        showUnSuccessMsg();
      }
    }
  };

  return (
    <div className={classes.signUpComp}>
      <p className={classes.heading}>Sign Up</p>
      <hr />
      <p>{successMsg}</p>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <InputComponent type="text" label="Full Name" name="fullName" value={formData.fullName} formErrors={formErrors?.fullName} handler={(e) => handler(e)} />
        <br />
        <InputComponent type="text" label="Email" name="email" value={formData.email} formErrors={formErrors?.email} handler={(e) => handler(e)} />
        <br />
        <InputComponent type="text" label="Employee Id" name="empId" value={formData.empId} formErrors={formErrors?.empId} handler={(e) => handler(e)} />
        <br />
        <SelectComp label="Office location" name="officeLoc" value={formData.officeLoc} formErrors={formErrors?.officeLoc} handler={(e) => handler(e)} options={officeLocArr} />
        <br />
        <SelectComp label="Department" name="department" value={formData.department} formErrors={formErrors?.department} handler={(e) => handler(e)} options={departmentArr} />
        <br />
        <InputComponent type="password" label="Password" name="password" value={formData.password} formErrors={formErrors?.password} handler={(e) => handler(e)} />
        <br />
        <InputComponent type="password" label="Repeat Password" name="confrmPswrd" value={formData.confrmPswrd} formErrors={formErrors?.confrmPswrd} handler={(e) => handler(e)} />
        <br />
        <div className={classes.buttonsContainer}>
          <Button variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained">Signup</Button>
        </div>
      </form>
      <p>
        Already registered,
        {" "}
        <Link to="/">Login Here</Link>
      </p>
    </div>
  );
}

export default Registration;
