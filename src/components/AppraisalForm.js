/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AFHeader from "./AFHeader";
import AppraisalTable from "./AppraisalTable";
import { makeStringQuery } from "./AccordianListing";

function AppraisalForm(props) {
  const { user } = props;
  const [kraArr, setKraArr] = useState();
  const { designation } = user;

  const getAllKRAsByDesigAndGoals = async () => {
    const qryString = makeStringQuery(designation);
    if (qryString) {
      const resp = await axios.get(`http://localhost:8080/api/kra/${qryString}`);
      const { data } = resp;
      setKraArr(data);
    }
  };

  useEffect(() => {
    getAllKRAsByDesigAndGoals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designation]);

  return (
    <div>
      <AFHeader user={user} />
      <TableContainer>
        {kraArr && kraArr.map((kra) => (
          <Table aria-label="customized table">
            <TableHead key={kra._id}>
              <TableRow>
                <TableCell sx={{ width: "20%", fontSize: "16px", fontWeight: 600 }}>
                  Weightage -
                  {" "}
                  {kra.weightage}
                  {" %"}
                </TableCell>
                <TableCell sx={{ width: "80%", fontSize: "16px", fontWeight: 600 }}>{kra.KraName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell>
                  <AppraisalTable kra={kra} designation={designation} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    </div>
  );
}

AppraisalForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default AppraisalForm;
