import React from "react";
import PropTypes from "prop-types";
import GoalsForm from "./GoalsForm";

function GoalListings(props) {
  const { dept } = props;
  return (
    <div><GoalsForm /></div>
  );
}

GoalListings.propTypes = {
  dept: PropTypes.string.isRequired
};

export default GoalListings;
