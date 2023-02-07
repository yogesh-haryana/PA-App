import React from "react";
import useStyles from "../Styles/InfoContainerStyles";
import AppraisalForm from "./AppraisalForm";
import AppraisalRating from "./AppraisalRating";
import BasicTabs from "./DepartmentTabs";
import PerformanceReport from "./PerformanceReport";

function InfoContainer() {
  const queryString = window.location.search;
  const paramsURL = new URLSearchParams(queryString);
  const eventClicked = paramsURL.get("event");

  const classes = useStyles();
  return (
    <div className={classes.infoContainer}>
      {(eventClicked === "Employee List" || eventClicked === "KRA List" || eventClicked === "Goal List") && <BasicTabs />}
      {eventClicked === "Performance Report" && <PerformanceReport />}
      {eventClicked === "Appraisal Form" && <AppraisalForm />}
      {eventClicked === "Appraisal Rating" && <AppraisalRating />}
      {/* <BasicTabs /> */}
    </div>
  );
}

export default InfoContainer;
