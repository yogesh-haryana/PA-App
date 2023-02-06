import {
  LOADING, LOGIN_SUCCESS, LOGIN_FAILED
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
