import {
  InputLabel, MenuItem, FormHelperText, Select
} from "@mui/material";
import PropTypes from "prop-types";

function SelectComp(props) {
  const {
    handler,
    formErrors,
    value,
    options,
    name,
    label
  } = props;

  return (
    <div>
      <InputLabel id="helper-label">{label}</InputLabel>
      <Select
        name={name}
        labelId="helper-label"
        value={value}
        // label={label}
        onChange={handler}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {options.map((elem) => (
          <MenuItem key={elem} value={elem}>{elem}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{formErrors}</FormHelperText>
    </div>
  );
}

SelectComp.propTypes = {
  handler: PropTypes.func.isRequired,
  formErrors: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired
};
SelectComp.defaultProps = {
  formErrors: "",
  label: ""
};
export default SelectComp;
