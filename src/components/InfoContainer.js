import React from "react";
import useStyles from "../Styles/InfoContainerStyles";

function InfoContainer() {
  const classes = useStyles();
  return (
    <div className={classes.infoContainer}>InfoContainer</div>
  );
}

export default InfoContainer;
