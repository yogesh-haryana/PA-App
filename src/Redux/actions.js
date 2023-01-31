import { SELECT_ROLE, SELECT_DESIG, ROLE_STATUS } from "./constants";

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
