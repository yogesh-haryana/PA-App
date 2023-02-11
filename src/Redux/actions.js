import {
  LOADING, LOGIN_SUCCESS, LOGIN_FAILED, DLT_KRA, DLT_OPEN, DLT_AGREE, UPDT_KRA, POST_NEW_KRA
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
