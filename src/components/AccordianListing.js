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
import { desigArr } from "./Admin";
import NewKRAForm from "./NewKRAForm";

export default function AccordianListing(props) {
  const { dept } = props;
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openedAccordian, setOpenedAcc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [KRAs, setKRAs] = useState();
  const [kraToEdit, setKraToEdit] = useState();
  const qryStringArr = openedAccordian.split(" ");
  const qryString = qryStringArr.join("%20");

  const handleChange = (panel, desig) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setOpenedAcc(desig);
  };

  const getSpecificDesigKRAs = async () => {
    const resp = await axios.get(`http://localhost:8080/api/kra/${qryString}`);
    const { data } = resp;
    setKRAs(data);
  };

  useEffect(() => {
    getSpecificDesigKRAs();
  }, [qryString]);

  const addNewKRA = () => {
    setModalOpen(true);
  };

  const handleEdit = (spcfcKRA) => {
    setKraToEdit(spcfcKRA);
    setEditMode(true);
    setModalOpen(true);
  };

  const deleteKRA = async (id) => {
    await axios.delete(`http://localhost:8080/api/kra/${id}`);
  };

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
                { KRAs && KRAs.map((kra, ind) => (
                  <ListItem
                    key={kra.KraName}
                    secondaryAction={(
                      <>
                        <IconButton edge="start" aria-label="edit" onClick={() => handleEdit(kra)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteKRA(kra._id)}>
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
        <NewKRAForm
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          kraToEdit={editMode ? kraToEdit : {}}
          btnName={editMode ? "update" : "save"}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </Box>
  );
}

AccordianListing.propTypes = {
  dept: PropTypes.string.isRequired
};
