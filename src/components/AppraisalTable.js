/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStringQuery } from "./AccordianListing";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function AppraisalTable(props) {
  const { kra, designation } = props;
  const [allGoals, setAllGoals] = useState();

  const getGoalsByKraNameAndDesig = async () => {
    if (kra.KraName && designation) {
      const KraName = makeStringQuery((kra.KraName).trim());
      const desig = makeStringQuery(designation);
      const resp = await axios.get(`http://localhost:8080/api/goals/?designation=${desig}&KraName=${KraName}`);
      setAllGoals(resp.data);
    }
  };

  useEffect(() => {
    getGoalsByKraNameAndDesig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kra.KraName]);

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableBody>
          {allGoals && allGoals.map((goal) => (
            <StyledTableRow key={goal._id}>
              <StyledTableCell component="th" scope="row">
                {goal.goalName}
              </StyledTableCell>
              <StyledTableCell align="right">A</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AppraisalTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  kra: PropTypes.object.isRequired,
  designation: PropTypes.string.isRequired
};
