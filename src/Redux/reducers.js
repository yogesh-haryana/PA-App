import { SELECT_ROLE, SELECT_DESIG, ROLE_STATUS } from "./constants";

const myState = {
  role: "",
  designation: "",
  roleStatus: false
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

  default:
    return state;
  }
};

export default signingUp;
