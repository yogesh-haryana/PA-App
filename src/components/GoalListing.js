/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import {
  IconButton, ListItemText, List, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  dltGoal, dltGoalConfrm,
  updateGoal,
  goalDltDialoug,
  setGoalModal
} from "../Redux/actions";
import { makeStringQuery } from "./AccordianListing";

function GoalListing(props) {
  const { openedAccordian, desig } = props;
  const [goals, setGoals] = useState();

  const dispatch = useDispatch();
  const {
    goalDltId,
    goalDltConfrm,
    dialougOpen
  } = useSelector((state) => state.handlingGoals);

  const getGoalsByKraNameAndDesig = async () => {
    if (openedAccordian && desig) {
      const KraName = makeStringQuery(openedAccordian.trim());
      const designation = makeStringQuery(desig);
      const resp = await axios.get(`http://localhost:8080/api/goals/?designation=${designation}&KraName=${KraName}`);
      setGoals(resp.data);
    }
  };

  useEffect(() => {
    getGoalsByKraNameAndDesig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedAccordian]);

  const deleteButtonClicked = (id) => {
    dispatch(dltGoal(id));
    dispatch(goalDltDialoug(true));
  };

  const deletingGoal = async () => {
    if (goalDltId) {
      if (goalDltConfrm) {
        await axios.delete(`http://localhost:8080/api/goals/1/${goalDltId}`);
        dispatch(goalDltDialoug(false));
        dispatch(dltGoalConfrm(false));
        getGoalsByKraNameAndDesig();
      }
    }
  };

  useEffect(() => {
    deletingGoal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalDltId, goalDltConfrm]);

  const editButtonClicked = (goal) => {
    dispatch(updateGoal(goal));
    dispatch(setGoalModal(true));
  };

  return (
    <List>
      { goals && goals.map((goal, index) => (
        <ListItem
          key={goal._id}
          secondaryAction={(
            <>
              <IconButton edge="start" aria-label="edit" onClick={() => editButtonClicked(goal)}>
                <ModeEditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteButtonClicked(goal._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        >
          <>
            <ListItemText>
              {index + 1}
              .
            </ListItemText>
            <ListItemText>{goal?.goalName}</ListItemText>
          </>
        </ListItem>
      ))}
      {dialougOpen && (
        <Dialog
          open={dialougOpen}
          onClose={() => dispatch(goalDltDialoug(false))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to delete ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => dispatch(goalDltDialoug(false))}>Disagree</Button>
            <Button onClick={() => dispatch(dltGoalConfrm(true))} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </List>
  );
}

GoalListing.propTypes = {
  openedAccordian: PropTypes.string.isRequired,
  desig: PropTypes.string.isRequired
};

export default GoalListing;
