import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function InputComponent(props) {
  const {
    handler,
    formErrors,
    value,
    name,
    label,
    type
  } = props;
  return (
    <TextField
      value={value}
      name={name}
      label={label}
      type={type}
      onChange={handler}
      variant="outlined"
      helperText={formErrors}
    />

  );
}

InputComponent.propTypes = {
  handler: PropTypes.func.isRequired,
  formErrors: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
InputComponent.defaultProps = {
  formErrors: ""
};

export default InputComponent;
