import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import InputComponent from "../helpers/InputComponent";

const initialState = {
  fullName: "",
  email: "",
  empId: "",
  //   officeLoc: "",
  //   department: "",
  password: "",
  confrmPswrd: ""
};

function Registration() {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  console.log(formData);

  const patterns = {
    fullName: "^[A-Za-z]{3,16}$",
    email: "yogesh@celestialsys.com",
    empId: "^[0-9][0-9][0-9]$",
    officeLoc: "^[A-Za-z]{3,16}$",
    department: "^[A-Za-z]{3,16}$",
    password: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)(?!.* ).{6,15}$",
    confrmPswrd: formData.password
  };

  const Validate = (values) => {
    const errors = {};
    switch (true) {
    case (values.fullName === ""):
      errors.fullName = "Name is required";
      break;

    case (!(values.fullName).match(patterns.fullName)):
      errors.fullName = "Full name should be 3-16 chars, no special characters";
      break;

    case (values.email === ""):
      errors.email = "Email is required";
      break;

    case (!(values.email).match(patterns.email)):
      errors.email = "Email should be company's provided";
      break;

    case (values.empId === ""):
      errors.empId = "Employee id is required";
      break;

    case (!(values.empId).match(patterns.empId)):
      errors.empId = "Employee Id should be a 3-digit number only";
      break;

    case (values.password === ""):
      errors.password = "Password is required";
      break;

    case (!(values.password).match(patterns.password)):
      errors.password = "Password must be 6-15 characters with 1 uppercase, 1 lowercase, and 1 special character";
      break;

    case (values.confrmPswrd === ""):
      errors.confrmPswrd = "Re enter your Password";
      break;

    case (!(values.confrmPswrd).match(patterns.confrmPswrd)):
      errors.confrmPswrd = "Passwords doesn't matches";
      break;

    default:
      break;
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(formData));
    setIsSubmit(true);
  };

  const APICALL = () => {
    console.log("api is called", formData, "form data");
  };

  useEffect(() => {
    const formErrArr = Object.keys(formErrors);
    if (formErrArr.length === 0 && isSubmit) {
      APICALL();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const handler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <br />
        <br />
        <InputComponent type="text" label="Full Name" name="fullName" value={formData.fullName} formErrors={formErrors?.fullName} handler={(e) => handler(e)} />
        <br />
        <br />
        <InputComponent type="text" label="Email" name="email" value={formData.email} formErrors={formErrors?.email} handler={(e) => handler(e)} />
        <br />
        <br />
        <InputComponent type="text" label="Employee Id" name="empId" value={formData.empId} formErrors={formErrors?.empId} handler={(e) => handler(e)} />
        <br />
        <br />
        <InputComponent type="password" label="Password" name="password" value={formData.password} formErrors={formErrors?.password} handler={(e) => handler(e)} />
        <br />
        <br />
        <InputComponent type="password" label="Repeat Password" name="confrmPswrd" value={formData.confrmPswrd} formErrors={formErrors?.confrmPswrd} handler={(e) => handler(e)} />
        <br />
        <br />
        <Button type="submit" variant="contained">Signup</Button>
      </form>
    </div>
  );
}

export default Registration;
