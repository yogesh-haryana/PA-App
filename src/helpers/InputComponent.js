import React from "react";
import { TextField, FormHelperText } from "@mui/material";
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
    <div>
      <TextField
        value={value}
        name={name}
        label={label}
        type={type}
        onChange={handler}
        variant="outlined"
      />
      <FormHelperText>{formErrors}</FormHelperText>
    </div>

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
