import React from "react";
import useStyles from "../Styles/InfoContainerStyles";
import AppraisalForm from "./AppraisalForm";
import AppraisalRating from "./AppraisalRating";
import DepartmentTabs from "./DepartmentTabs";
import PerformanceReport from "./PerformanceReport";
import Settings from "./Settings";

function InfoContainer() {
  const queryString = window.location.search;
  const paramsURL = new URLSearchParams(queryString);
  const eventClicked = paramsURL.get("event");

  const classes = useStyles();
  return (
    <div className={classes.infoContainer}>
      {(eventClicked === "Employee List" || eventClicked === "KRA List" || eventClicked === "Goal List") && <DepartmentTabs eventClicked={eventClicked} />}
      {eventClicked === "Performance Report" && <PerformanceReport />}
      {eventClicked === "Appraisal Form" && <AppraisalForm />}
      {eventClicked === "Appraisal Rating" && <AppraisalRating />}
      {eventClicked === "Settings" && <Settings />}
    </div>
  );
}

export default InfoContainer;
