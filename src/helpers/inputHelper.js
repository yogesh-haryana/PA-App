import { TextField } from "@mui/material";

const createInput = (name, label, handler, type = "text") => (
  <TextField type={type} name={name} label={label} onChange={(e) => handler(e)} />
);

export default createInput;
