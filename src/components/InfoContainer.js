import React from "react";
import PropTypes from "prop-types";
import useStyles from "../Styles/InfoContainerStyles";
import AppraisalForm from "./AppraisalForm";
import AppraisalRating from "./AppraisalRating";
import DepartmentTabs from "./DepartmentTabs";
import PerformanceReport from "./PerformanceReport";
import Settings from "./Settings";

function InfoContainer(props) {
  const { user } = props;
  const queryString = window.location.search;
  const paramsURL = new URLSearchParams(queryString);
  const eventClicked = paramsURL.get("event");

  const classes = useStyles();
  return (
    <div className={classes.infoContainer}>
      {(eventClicked === "Employee List" || eventClicked === "KRA List" || eventClicked === "Goal List") && <DepartmentTabs eventClicked={eventClicked} />}
      {eventClicked === "Performance Report" && <PerformanceReport user={user} />}
      {eventClicked === "Appraisal Form" && <AppraisalForm user={user} />}
      {eventClicked === "Appraisal Rating" && <AppraisalRating user={user} />}
      {eventClicked === "Settings" && <Settings />}
    </div>
  );
}

InfoContainer.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
};

export default InfoContainer;
