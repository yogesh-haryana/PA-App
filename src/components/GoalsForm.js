/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import {
  Box, TextField, Button, Paper, Select, InputLabel, MenuItem, FormHelperText
} from "@mui/material";
import Modal from "@mui/material/Modal";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import axios from "axios";
import { desigArr } from "./Admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: ".5px solid #000",
  boxShadow: 24,
  p: 4
};

const initValues = {
  KraName: "",
  goalName: "",
  goalDescription: ""
};

// const existKra = {
// // eslint-disable-next-line no-underscore-dangle
// id: goal._id,
// designation: kraToEdit.designation,
// KraName: kraToEdit.KraName,
// KraDescription: kraToEdit.KraDescription,
// weightage: kraToEdit.weightage
// };

function GoalsForm() {
  const [designation, setDesignation] = useState("");
  //   const [KraName, setKraName] = useState("");
  //   const [goalName, setGoalName] = useState("");
  //   const [goalDescription, setGoalDescription] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState(initValues);
  const [KraNamesArr, setKraNamesArr] = useState([]);
  const qryStringArr = designation?.split(" ");
  const qryString = qryStringArr?.join("%20");

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const getSpecificKraNamesArr = async () => {
    if (qryString) {
      const resp = await axios.get(`http://localhost:8080/api/kra/${qryString}`);
      const { data } = resp;
      data.forEach((element) => {
        setKraNamesArr([...KraNamesArr, element.KraName]);
      });
    }
  };

  useEffect(() => {
    getSpecificKraNamesArr();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designation]);

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

    case (values.goalName === ""):
      errors.goalName = "Goal Name is required";
      validationStatus = false;
      break;

    case (values.goalDescription === ""):
      errors.goalDescription = "Goal Description is required";
      validationStatus = false;
      break;

    default:
      break;
    }
    setFormErrors(errors);
    return validationStatus;
  };

  const selectDesignation = (e) => {
    setKraNamesArr([]);
    setDesignation(e.target.value);
  };

  const handler = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    formValues.designation = designation;
    if (Validate(formValues)) {
      console.log(formValues);
    }
  };

  return (
    <div>
      <Button onClick={() => setModalOpen(true)} variant="contained">Open</Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component={Paper} sx={style}>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <div>
              <InputLabel id="helper-label">Designation</InputLabel>
              <Select
                sx={{ minWidth: "200px" }}
                name="designation"
                labelId="helper-label"
                value={designation}
                onChange={(e) => selectDesignation(e)}
              >
                {desigArr.map((elem) => (
                  <MenuItem key={elem} value={elem}>{elem}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.designation}</FormHelperText>
            </div>
            {" "}
            <br />
            <div>
              <InputLabel id="helper-label">Designation</InputLabel>
              <Select
                sx={{ minWidth: "200px" }}
                name="KraName"
                labelId="helper-label"
                value={formValues.KraName}
                onChange={handler}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {KraNamesArr?.map((elem) => (
                  <MenuItem key={elem} value={elem}>{elem}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.KraName}</FormHelperText>
            </div>
            <br />
            <FormLabel>Goal Name</FormLabel>
            <TextField
              sx={{ minWidth: "200px" }}
              name="goalName"
              onChange={handler}
              value={formValues.goalName}
              type="text"
            />
            <FormHelperText>{formErrors.goalName}</FormHelperText>

            <br />
            <Box>
              <FormLabel>Goal Description</FormLabel>
              <Textarea name="goalDescription" value={formValues.goalDescription} onChange={handler} sx={{ maxWidth: "220px" }} maxRows={4} minRows={2} />
              <FormHelperText>{formErrors.goalDescription}</FormHelperText>
            </Box>
            <br />
            <Button type="button" variant="filled" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default GoalsForm;
