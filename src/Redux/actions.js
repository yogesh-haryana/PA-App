import {
  LOADING, LOGIN_SUCCESS, LOGIN_FAILED,
  DLT_KRA, DLT_OPEN, DLT_AGREE, UPDT_KRA, POST_NEW_KRA,
  DLT_GOAL, DLT_GOAL_CONFRM, UPDT_GOAL, DIALOG, SET_EDIT_MODE, SET_GOAL_MODAL
} from "./constants";

export const loadingData = () => ({
  type: LOADING
});

export const lodingSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
});

export const lodingFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload
});

export const deleteKRA = (payload) => ({
  type: DLT_KRA,
  payload
});

export const deleteOpen = (payload) => ({
  type: DLT_OPEN,
  payload
});

export const deleteAgree = (payload) => ({
  type: DLT_AGREE,
  payload
});

export const updtKRA = (payload) => ({
  type: UPDT_KRA,
  payload
});

export const newKRA = (payload) => ({
  type: POST_NEW_KRA,
  payload
});

export const dltGoal = (payload) => ({
  type: DLT_GOAL,
  payload
});

export const dltGoalConfrm = (payload) => ({
  type: DLT_GOAL_CONFRM,
  payload
});

export const updateGoal = (payload) => ({
  type: UPDT_GOAL,
  payload
});

export const goalDltDialoug = (payload) => ({
  type: DIALOG,
  payload
});

export const setEditMode = (payload) => ({
  type: SET_EDIT_MODE,
  payload
});

export const setGoalModal = (payload) => ({
  type: SET_GOAL_MODAL,
  payload
});
