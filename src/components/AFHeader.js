/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useStyles from "../Styles/AFHeaderStyles";

function AFHeader(props) {
  const classes = useStyles();
  const { user } = props;
  const { appraisalStatus } = useSelector((state) => state.handleAppraisal);
  const { fy } = appraisalStatus;

  // eslint-disable-next-line no-unused-vars
  const [ratingStr, setRatingStr] = useState("");

  return (
    <div className={classes.headerContainer}>
      <div className={classes.heading}>
        <span className={classes.heading1}>
          Annual Performace Appraisal
          {fy}
        </span>
        <span className={classes.heading2}>
          1 Apr
          {fy - 1}
          - 31 March
          {fy}
        </span>
      </div>
      <hr />
      <div className={classes.flexDetails}>
        <div className={classes.flexControl}>
          <p>{(user.fullName).toUpperCase()}</p>
          <span>{user.designation}</span>
          {" - "}
          <span>{user.department}</span>
        </div>
        <hr />
        <div className={classes.flexControl}>
          <p>Final Score</p>
          <span />
        </div>
        <hr />
        <div className={classes.flexControl}>
          <p>Rating</p>
          <span />
        </div>
      </div>
      <hr />
      <p className={classes.self}> Self Appraisal</p>
      <div>
        <div className={classes.rating}>
          <div>Rating</div>
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={ratingStr}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <hr />
        <div className={classes.KraVsGoals}>
          <div>KRAs vs GOALS</div>
          <div>{user.fullName.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}

AFHeader.propTypes = {
  user: PropTypes.object.isRequired
};

export default AFHeader;
