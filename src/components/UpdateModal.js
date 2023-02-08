/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import {
  InputLabel, Button, Select, MenuItem
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

export default function BasicModal(props) {
  const { modalState, setModalState, userInfo } = props;
  const initialState = {
    role: userInfo.role,
    designation: userInfo.designation
  };
  const [selectData, setSelectData] = useState(initialState);

  const handleClose = () => setModalState(false);

  const handler = (e) => {
    const { name, value } = e.target;
    setSelectData({ ...selectData, [name]: value });
  };

  const updateRoleAndDesig = async () => {
    await axios.put(`http://localhost:8080/api/users/verified/1/${userInfo._id}`, selectData);
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
            </>
          )}
          <Button variant="filled" onClick={handleClose}>Close Modal</Button>
          <Button variant="contained" color="success" onClick={updateRoleAndDesig}>Update</Button>
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
