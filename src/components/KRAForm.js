import { useState } from "react";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import InputComponent from "../helpers/InputComponent";
import SelectComp from "../helpers/SelectComp";
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
