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
import { Button } from "@mui/material";
import AFHeader from "./AFHeader";
import AppraisalTable from "./AppraisalTable";
import { makeStringQuery } from "./AccordianListing";
import request from "../helpers/httpHelper";

function AppraisalForm(props) {
  const date = new Date();
  const fy = date.getFullYear();
  const [ratingValue, setRatingValue] = useState({});
  const [userComment, setUserCommt] = useState({});
  const { user } = props;
  const [kraArr, setKraArr] = useState();
  const {
    designation, fullName, empId, department
  } = user;

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

  const preparingData = () => {
    const reviewData = {
      name: fullName,
      empId,
      department,
      designation,
      fincYear: fy,
      reviews: {
        selfComments: userComment,
        selfRatings: ratingValue,
        mngrRatings: {},
        mngrComments: {}
      }
    };
    return reviewData;
  };

  const postDataToApi = async () => {
    const data = preparingData();
    const url = "http://localhost:8080/api/reviews";
    const method = "POST";
    await request(url, method, data);
  };

  const sumbitSelfApp = (e) => {
    e.preventDefault();
    postDataToApi();
  };

  return (
    <div>
      <AFHeader user={user} />
      <form onSubmit={(e) => sumbitSelfApp(e)}>
        <TableContainer>
          {kraArr && kraArr.map((kra, indx) => (
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
                    <AppraisalTable
                      kra={kra}
                      indx={indx}
                      empId={empId}
                      designation={designation}
                      ratingValue={ratingValue}
                      setRatingValue={setRatingValue}
                      userComment={userComment}
                      setUserCommt={setUserCommt}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </TableContainer>
        <div>
          <Button type="submit" variant="contained">Submit</Button>
          <Button type="reset" variant="outlined">Reset</Button>
        </div>
      </form>
    </div>
  );
}

AppraisalForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default AppraisalForm;
