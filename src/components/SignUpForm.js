import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import createInput from "../helpers/inputHelper";
import RoleSelect from "./RoleSelect";
import DesignationSelect from "./DesignationSelect";
// import useStyles from "../helpers/Styles/signUpStyles";

const initialState = {
  name: "",
  email: "",
  password: "",
  confrmPswrd: "",
  role: "",
  designation: ""
};

function SignUpForm() {
  const [formDetails, setFormDetails] = useState(initialState);
  const { role, designation, roleStatus } = useSelector((state) => state.signingUp);
  console.log(role, "role");
  console.log(designation, "designation");
  // const classes = useStyles();

  const onSignUp = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setFormDetails((prevState) => ({
      ...prevState,
      [inputName]: inputValue
    }));
  };
  return (
    <div>
      <form onSubmit={(e) => { onSignUp(e); }}>
        {createInput("name", "Enter your name", handleChange)}
        {createInput("email", "Enter an Email Address", handleChange)}
        {createInput("password", "Create Password", handleChange, "password")}
        {createInput("confrmPswrd", "Re-enter Password", handleChange, "password")}
        <RoleSelect />
        { roleStatus && <DesignationSelect />}
        <div>
          <Button type="button" variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
