import { useState } from "react";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import InputComponent from "../helpers/InputComponent";
import SelectComp from "../helpers/SelectComp";
import { desigArr } from "./Admin";
import request from "../helpers/httpHelper";

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

function NewKRAForm(props) {
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
    designation: kraToEdit.designation,
    KraName: kraToEdit.KraName,
    KraDescription: kraToEdit.KraDescription,
    weightage: kraToEdit.weightage
  };
  const [formValues, setFormValues] = useState(existKra || initValues);
  const [formErrors, setFormErrors] = useState(initErrs);
  const [response, setResponse] = useState();
  // eslint-disable-next-line no-underscore-dangle
  const id = kraToEdit._id;

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

  const updateExistingKRA = async () => {
    const valuesToUpdt = formValues;
    let resp = await request(`http://localhost:8080/api/kra/update/${id}`, "PATCH", valuesToUpdt);
    resp = await resp.json();
    console.log(resp);
  };

  const postNewKRA = async () => {
    const url = "http://localhost:8080/api/kra/";
    const method = "POST";
    let resp = await request(url, method, formValues);
    resp = await resp.json();
    // response message will show here resp.status
    console.log(resp);
  };

  const Validate = (values) => {
    const errors = {};
    let validationStatus = true;
    switch (true) {
    case (values.designation === ""):
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
    e.preventDefault();
    if (Validate(formValues) === true) {
      if (id && editMode) {
        updateExistingKRA();
      } else {
        postNewKRA();
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
            <SelectComp name="designation" label="Designation" handler={handler} options={desigArr} formErrors={formErrors.designation} value={formValues.designation} />
            <br />
            <InputComponent name="KraName" label="KRA Name" handler={handler} value={formValues.KraName} formErrors={formErrors.KraName} type="text" />
            <br />
            <InputComponent name="KraDescription" label="KRA Description" handler={handler} value={formValues.KraDescription} formErrors={formErrors.KraDescription} type="text" />
            <br />
            <InputComponent name="weightage" label="KRA weightage" handler={handler} value={formValues.weightage} formErrors={formErrors.weightage} type="number" />
            <br />
            <Button type="button" variant="filled" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">{btnName}</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

NewKRAForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  kraToEdit: PropTypes.object,
  btnName: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired
};

NewKRAForm.defaultProps = {
  kraToEdit: ""
};

export default NewKRAForm;
