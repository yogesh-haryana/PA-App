import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { PropagateLoader } from "react-spinners";
import BasicModal from "./UpdateModal";

// const initialState = {
//   role: "",
//   designation: ""
// };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
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

function TableListing(props) {
  const { usersData, isLoading } = props;
  //   const [selectvalue, setSelectValue] = useState(initialState);
  const [modalState, setModalState] = useState(false);

  const openModel = () => {
    setModalState(true);
  };

  return (
    <TableContainer component={Paper}>
      {isLoading && <PropagateLoader color="#36d7b7" />}
      {!isLoading && usersData && (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Employee Id</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <StyledTableRow key={user?.empId}>
                <StyledTableCell component="th" scope="row">
                  {user?.fullName}
                </StyledTableCell>
                <StyledTableCell>
                  {user.empId}
                </StyledTableCell>
                <StyledTableCell>
                  {user.role}
                </StyledTableCell>
                <StyledTableCell>
                  { user.designation ? user.designation : "N/A" }
                </StyledTableCell>
                <StyledTableCell>
                  <BorderColorIcon sx={{ cursor: "pointer" }} type="button" onClick={openModel} />
                  <BasicModal modalState={modalState} setModalState={setModalState} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

TableListing.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  usersData: PropTypes.array,
  isLoading: PropTypes.bool.isRequired
};

TableListing.defaultProps = {
  usersData: []

};

export default TableListing;
