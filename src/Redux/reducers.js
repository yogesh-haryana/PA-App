import {
  SELECT_ROLE, SELECT_DESIG, ROLE_STATUS, SELECT_DEPT
} from "./constants";

const myState = {
  role: "",
  designation: "",
  roleStatus: false,
  department: ""
};

// eslint-disable-next-line default-param-last
const signingUp = (state = myState, action) => {
  switch (action.type) {
  case SELECT_ROLE:
    return {
      ...state,
      role: action.payload
    };

  case SELECT_DESIG:
    return {
      ...state,
      designation: action.payload
    };

  case ROLE_STATUS:
    return {
      ...state,
      roleStatus: action.payload
    };

  case SELECT_DEPT:
    return {
      ...state,
      department: action.payload
    };

  default:
    return state;
  }
};

export default signingUp;
