/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails, Box, Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { desigArr } from "./Admin";
import GoalsForm from "./GoalsForm";
import NestedKraAccordian from "./NestedKraAccordian";

function AccordianForGoals(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openedAccordian, setOpenedAcc] = useState("");
  const { dept } = props;
  const { goalToUpdate, editMode } = useSelector((state) => state.handlingGoals);

  const handleChange = (panel, desig) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setOpenedAcc(desig);
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
              {openedAccordian && <NestedKraAccordian openedAccordian={openedAccordian} />}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Button onClick={() => setModalOpen(true)} variant="contained">Open</Button>
      {(isModalOpen || editMode)
       && (
         <GoalsForm
           editMode={editMode}
           isModalOpen={isModalOpen}
           setModalOpen={setModalOpen}
           goalToUpdate={editMode && goalToUpdate}
         />
       )}
    </Box>
  );
}

AccordianForGoals.propTypes = {
  dept: PropTypes.string.isRequired
};

export default AccordianForGoals;
