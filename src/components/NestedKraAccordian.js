/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails
} from "@mui/material";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import axios from "axios";
import GoalListing from "./GoalListing";

function NestedKraAccordian(props) {
  const { openedAccordian } = props;
  const [expanded, setExpanded] = useState(false);
  const [openNested, setOpenedNested] = useState("");
  const [KRAs, setKRAs] = useState();
  const qryStringArr = openedAccordian?.split(" ");
  const qryString = qryStringArr?.join("%20");

  const handleNested = (panel, KraName) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setOpenedNested(KraName);
  };

  const getSpecificDesigKRAs = async () => {
    if (qryString) {
      const resp = await axios.get(`http://localhost:8080/api/kra/${qryString}`);
      const { data } = resp;
      setKRAs(data);
    }
  };

  useEffect(() => {
    getSpecificDesigKRAs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedAccordian]);

  return (
    <List>
      {KRAs && KRAs.map((kraItem, index) => (
        <Accordion
          key={kraItem._id}
          expanded={expanded === index}
          onChange={handleNested(index, kraItem.KraName)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "70%", flexShrink: 0, fontWeight: 500 }}>
              {kraItem.KraName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {openNested && <GoalListing openedAccordian={openNested} />}
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
}

NestedKraAccordian.propTypes = {
//   KRAs: PropTypes.array.isRequired
  openedAccordian: PropTypes.string.isRequired
};

export default NestedKraAccordian;
