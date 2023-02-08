import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

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
  const { modalState, setModalState } = props;
  const handleClose = () => setModalState(false);

  return (
    <div>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button variant="filled" onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired
};
