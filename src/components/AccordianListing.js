/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconButton, AccordionDetails, Box, Button, ListItemText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import KRAForm from "./KRAForm";
import { desigArr } from "./Admin";
import { deleteKRA as deleteMyKRA, deleteAgree, deleteOpen } from "../Redux/actions";
import request from "../helpers/httpHelper";
import "react-toastify/dist/ReactToastify.css";

export const makeStringQuery = (str) => {
  const qryStringArr = str?.split(" ");
  const qryString = qryStringArr?.join("%20");
  return qryString;
};

export default function AccordianListing(props) {
  const { dept } = props;
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openedAccordian, setOpenedAcc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [KRAs, setKRAs] = useState();
  const [kraToEdit, setKraToEdit] = useState();
  const dispatch = useDispatch();
  const {
    dltMyKRA, dltOpen, dltAgree, kraToUpdt, newKRA, kraUpdtID
  } = useSelector((state) => state.handingKRAs);
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailed = (msg) => toast.error(msg);

  const handleChange = (panel, desig) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setOpenedAcc(desig);
  };

  const getSpecificDesigKRAs = async () => {
    const query = makeStringQuery(openedAccordian);
    const resp = await axios.get(`http://localhost:8080/api/kra/${query}`);
    const { data } = resp;
    setKRAs(data);
  };

  useEffect(() => {
    getSpecificDesigKRAs();
  }, [openedAccordian]);

  const addNewKRA = () => {
    setModalOpen(true);
  };

  const handleEdit = (spcfcKRA) => {
    setKraToEdit(spcfcKRA);
    setEditMode(true);
    setModalOpen(true);
  };

  const deleteButtonClicked = (myKra) => {
    dispatch(deleteOpen(true));
    dispatch(deleteMyKRA(myKra));
  };

  const deleteKRA = async () => {
    if (dltMyKRA) {
      if (dltAgree) {
        const desig = makeStringQuery(dltMyKRA.designation);
        const name = makeStringQuery(dltMyKRA.KraName);
        await axios.delete(`http://localhost:8080/api/kra/${dltMyKRA._id}`);
        await axios.delete(`http://localhost:8080/api/goals/?designation=${desig}&KraName=${name}`);
        dispatch(deleteOpen(false));
        dispatch(deleteAgree(false));
        getSpecificDesigKRAs();
      }
    }
  };

  useEffect(() => {
    deleteKRA();
  }, [dltMyKRA._id, dltAgree]);

  // update and post new Kras from KRA Form component

  const updateExistingKRA = async () => {
    if (kraUpdtID) {
      let resp = await request(`http://localhost:8080/api/kra/update/${kraUpdtID}`, "PATCH", kraToUpdt);
      resp = await resp.json();
      if (resp.status === 200) {
        notifySuccess(resp.response);
        getSpecificDesigKRAs();
      } else if (resp.status === 422) {
        notifyFailed(resp.response);
      }
    }
    getSpecificDesigKRAs();
  };

  const postNewKRA = async () => {
    if (newKRA.weightage) {
      const url = "http://localhost:8080/api/kra/";
      const method = "POST";
      let resp = await request(url, method, newKRA);
      resp = await resp.json();
      // response message will show here resp.status
      if (resp.status === 200) {
        notifySuccess(resp.response);
      } else if (resp.status === 422) {
        notifyFailed(resp.response);
      }
    }
    getSpecificDesigKRAs();
  };

  useEffect(() => {
    updateExistingKRA();
  }, [kraUpdtID]);

  useEffect(() => {
    postNewKRA();
  }, [newKRA.KraName]);

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Box sx={{ width: "60%" }}>
        {dept === "FE" && desigArr.map((desig, index) => (
          <Accordion
            key={desig}
            expanded={expanded === index}
            onChange={handleChange(index, desig)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "70%", flexShrink: 0, fontWeight: 600 }}>
                {desig}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                { KRAs?.map((kra, ind) => (
                  <ListItem
                    key={kra.KraName}
                    secondaryAction={(
                      <>
                        <IconButton edge="start" aria-label="edit" onClick={() => handleEdit(kra)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteButtonClicked(kra)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  >
                    <>
                      <ListItemText>
                        {ind + 1}
                        .
                      </ListItemText>
                      <ListItemText>{kra?.KraName}</ListItemText>
                    </>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Button onClick={addNewKRA} sx={{ position: "absolute", top: "0", right: "0" }} type="button" variant="contained">New KRA</Button>
      {isModalOpen && (
        <KRAForm
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          kraToEdit={editMode ? kraToEdit : {}}
          btnName={editMode ? "update" : "save"}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      {dltOpen && (
        <Dialog
          open={dltOpen}
          onClose={() => dispatch(deleteOpen(false))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to delete ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => dispatch(deleteOpen(false))}>Disagree</Button>
            <Button onClick={() => dispatch(deleteAgree(true))} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}

AccordianListing.propTypes = {
  dept: PropTypes.string.isRequired
};
