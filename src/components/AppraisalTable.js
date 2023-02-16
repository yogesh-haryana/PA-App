import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

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
  const { allGoals } = props;
  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Goal Name</StyledTableCell>
            <StyledTableCell align="right">Self-Rating</StyledTableCell>
            <StyledTableCell align="right">Comment(Self)</StyledTableCell>
            <StyledTableCell align="right">Manager-Rating</StyledTableCell>
            <StyledTableCell align="right">Comment(Manager)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allGoals && allGoals.map((goal) => (
            <StyledTableRow key={goal.name}>
              <StyledTableCell component="th" scope="row">
                {goal.goalName}
              </StyledTableCell>
              <StyledTableCell align="right">A</StyledTableCell>
              <StyledTableCell align="right">B</StyledTableCell>
              <StyledTableCell align="right">C</StyledTableCell>
              <StyledTableCell align="right">D</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AppraisalTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allGoals: PropTypes.array.isRequired
};
