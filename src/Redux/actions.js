import {
  SELECT_ROLE, SELECT_DESIG, ROLE_STATUS, SELECT_DEPT
} from "./constants";

export const selectRole = (payload) => ({
  type: SELECT_ROLE,
  payload
});

export const selectDesig = (payload) => ({
  type: SELECT_DESIG,
  payload
});

export const setRoleStatus = (payload) => ({
  type: ROLE_STATUS,
  payload
});

export const selectDepartment = (payload) => ({
  type: SELECT_DEPT,
  payload
});
