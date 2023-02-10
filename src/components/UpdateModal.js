/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import {
  InputLabel, Button, Select, MenuItem, FormHelperText
} from "@mui/material";
import axios from "axios";
import { rolesArr, desigArr } from "./Admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const initialErrs = {
  role: "",
  designation: ""
};

export default function BasicModal(props) {
  const { modalState, setModalState, userInfo } = props;
  const initialState = {
    role: userInfo.role,
    designation: userInfo.designation
  };

  const [selectData, setSelectData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrs);

  const handleClose = () => setModalState(false);

  const Validate = (values) => {
    const errors = {};
    let validationStatus = true;
    switch (true) {
    case (values.role === ""):
      errors.role = "Role is required";
      validationStatus = false;
      break;

    case (values.role === "Engineer" && values.designation === ""):
      errors.designation = "Designation is required for engineers";
      validationStatus = false;
      break;

    default:
      break;
    }
    setFormErrors(errors);
    return validationStatus;
  };

  const handler = (e) => {
    const { name, value } = e.target;
    setSelectData({ ...selectData, [name]: value });
  };

  const updateRoleAndDesig = async () => {
    let dataToUpdate = {};
    if (selectData.role === "Management" || selectData.role === "Manager") {
      dataToUpdate = {
        role: selectData.role,
        designation: ""
      };
    } else {
      dataToUpdate = selectData;
    }
    const resp = await axios.put(`http://localhost:8080/api/users/verified/1/${userInfo._id}`, dataToUpdate);
    return resp;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (Validate(selectData) === true) {
      updateRoleAndDesig();
      setModalState(false);
    }
  };

  return (
    <div>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <InputLabel id="helper-label">Role - </InputLabel>
            <Select
              name="role"
              value={selectData.role}
              label="role"
              onChange={handler}
            >
              {rolesArr.map((elem) => (
                <MenuItem key={elem} value={elem}>{elem}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.role}</FormHelperText>

            <br />
            {selectData.role === "Engineer" && (
              <>
                <InputLabel id="helper-label">Role - </InputLabel>
                <Select
                  name="designation"
                  value={selectData.designation}
                  label="designation"
                  onChange={handler}
                >
                  {desigArr.map((elem) => (
                    <MenuItem key={elem} value={elem}>{elem}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formErrors.designation}</FormHelperText>

              </>
            )}
            <Button variant="filled" onClick={handleClose}>Close Modal</Button>
            <Button type="submit" variant="contained" color="success">Update</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userInfo: PropTypes.object.isRequired
};
