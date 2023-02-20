/* eslint-disable react/forbid-prop-types */
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
import Textarea from "@mui/joy/Textarea";
import Rating from "@mui/material/Rating";
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
  const {
    kra, designation, indx, empId,
    ratingValue, setRatingValue, userComment, setUserCommt
  } = props;
  const [allGoals, setAllGoals] = useState();
  const [formData, setFormData] = useState();

  const checkIfFormFilled = async () => {
    const response = await axios.get(`http://localhost:8080/api/reviews/${empId}`);
    setFormData(response.data);
  };

  useEffect(() => {
    checkIfFormFilled();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const ratingHandler = (e) => {
    const { name, value } = e.target;
    setRatingValue({ ...ratingValue, [name]: Number(value) });
  };

  const commentHandler = (e) => {
    const { name, value } = e.target;
    setUserCommt({ ...userComment, [name]: value });
  };

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableBody>
          {allGoals && allGoals.map((goal, idx) => (
            <StyledTableRow key={goal._id}>
              <StyledTableCell component="th" scope="row">
                {goal.goalName}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Rating
                  name={`ratingSelf${indx}-${idx}`}
                  value={ratingValue[`ratingSelf${indx}-${idx}`]}
                  onChange={(e) => ratingHandler(e)}
                  precision={0.5}
                />
                <Textarea name={`goalComment${indx}-${idx}`} value={userComment[`goalComment${indx}-${idx}`]} onChange={(e) => commentHandler(e)} sx={{ maxWidth: "220px" }} maxRows={4} minRows={2} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AppraisalTable.propTypes = {
  kra: PropTypes.object.isRequired,
  designation: PropTypes.string.isRequired,
  empId: PropTypes.number.isRequired,
  indx: PropTypes.number.isRequired,
  ratingValue: PropTypes.object.isRequired,
  userComment: PropTypes.object.isRequired,
  setRatingValue: PropTypes.func.isRequired,
  setUserCommt: PropTypes.func.isRequired
};
