/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { makeStringQuery } from "./AccordianListing";
import useStyles from "../Styles/AppraisalFormStyles";
import AFHeader from "./AFHeader";

function AppraisalForm(props) {
  const { user } = props;

  const classes = useStyles();
  // const [allGoals, setAllGoals] = useState();
  // eslint-disable-next-line no-unused-vars
  const [kraArr, setKraArr] = useState();
  const { designation } = user;
  const { appraisalStatus } = useSelector((state) => state.handleAppraisal);

  const getSpecificKraNamesArr = async () => {
    const qryString = makeStringQuery(designation);
    if (qryString) {
      const resp = await axios.get(`http://localhost:8080/api/kra/${qryString}`);
      const { data } = resp;
      setKraArr(data);
    }
  };

  useEffect(() => {
    getSpecificKraNamesArr();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designation]);

  // const getGoalsByKraNameAndDesig = async () => {
  //   if (openedKraAcc && designation) {
  //     const KraName = makeStringQuery(openedKraAcc.trim());
  //     const desig = makeStringQuery(designation);
  //     const resp = await axios.get(`http://localhost:8080/api/goals/?designation=${desig}&KraName=${KraName}`);
  //     setAllGoals(resp.data);
  //   }
  // };

  // useEffect(() => {
  //   getGoalsByKraNameAndDesig();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [openedKraAcc]);
  return (
    <div className={classes.mainContainer}>
      <AFHeader user={user} />
    </div>
  );
}

AppraisalForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default AppraisalForm;
