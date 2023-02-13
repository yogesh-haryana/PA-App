/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import {
  Box, TextField, Button, Paper, Select, InputLabel, MenuItem, FormHelperText
} from "@mui/material";
import Modal from "@mui/material/Modal";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { desigArr } from "./Admin";
import { updtKRA, newKRA } from "../Redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: ".5px solid #000",
  boxShadow: 24,
  p: 4
};

const initErrs = {
  designation: "",
  KraName: "",
  KraDescription: "",
  weightage: ""
};

function KRAForm(props) {
  const {
    isModalOpen, setModalOpen, kraToEdit, btnName,
    editMode, setEditMode
  } = props;

  const initValues = {
    designation: "",
    KraName: "",
    KraDescription: "",
    weightage: ""
  };

  const existKra = {
    // eslint-disable-next-line no-underscore-dangle
    id: kraToEdit._id,
    designation: kraToEdit.designation,
    KraName: kraToEdit.KraName,
    KraDescription: kraToEdit.KraDescription,
    weightage: kraToEdit.weightage
  };
  const [formValues, setFormValues] = useState(existKra || initValues);
  const [formErrors, setFormErrors] = useState(initErrs);
  const dispatch = useDispatch();

  const handleClose = () => {
    setModalOpen(false);
    setEditMode(false);
  };

  const handler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCancel = () => {
    setFormValues(initValues);
    setModalOpen(false);
    setEditMode(false);
  };

  const Validate = (values) => {
    const errors = {};
    let validationStatus = true;
    switch (true) {
    case (values.designation === "" || values.designation === undefined):
      errors.designation = "Designation is required";
      validationStatus = false;
      break;

    case (values.KraName === ""):
      errors.KraName = "KRA Name is required";
      validationStatus = false;
      break;

    case (values.KraDescription === ""):
      errors.KraDescription = "KRA Description is required";
      validationStatus = false;
      break;

    case (values.weightage === ""):
      errors.weightage = "KRA weightage is required";
      validationStatus = false;
      break;

    default:
      break;
    }
    setFormErrors(errors);
    return validationStatus;
  };

  const onFormSubmit = (e) => {
    console.log(formValues);
    e.preventDefault();
    if (Validate(formValues) === true) {
      if (formValues.id && editMode) {
        dispatch(updtKRA(formValues));
      } else {
        dispatch(newKRA(formValues));
      }
      setModalOpen(false);
      setEditMode(false);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component={Paper} sx={style}>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <InputLabel id="helper-label">Designation</InputLabel>
            <Select
              labelId="helper-label"
              name="designation"
              onChange={handler}
              value={formValues.designation}
              sx={{ minWidth: "200px" }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {desigArr.map((elem) => (
                <MenuItem key={elem} value={elem}>{elem}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.designation}</FormHelperText>
            <br />
            <FormLabel>KRA Name</FormLabel>
            <TextField
              sx={{ minWidth: "200px" }}
              name="KraName"
              onChange={handler}
              value={formValues.KraName}
              type="text"
            />
            <FormHelperText>{formErrors.KraName}</FormHelperText>
            <br />
            <Box>
              <FormLabel>KRA Description</FormLabel>
              <Textarea name="KraDescription" value={formValues.KraDescription} onChange={handler} sx={{ maxWidth: "220px" }} maxRows={4} minRows={2} />
              <FormHelperText>{formErrors.KraDescription}</FormHelperText>
            </Box>
            <br />
            <FormLabel>KRA weightage</FormLabel>
            <TextField
              sx={{ minWidth: "200px" }}
              name="weightage"
              onChange={handler}
              value={formValues.weightage}
              type="number"
            />
            <FormHelperText>{formErrors.weightage}</FormHelperText>
            <br />
            <Button type="button" variant="filled" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">{btnName}</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

KRAForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  kraToEdit: PropTypes.object,
  btnName: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired
};

KRAForm.defaultProps = {
  kraToEdit: ""
};

export default KRAForm;
