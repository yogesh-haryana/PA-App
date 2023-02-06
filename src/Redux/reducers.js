import {
  LOADING, LOGIN_SUCCESS, LOGIN_FAILED
} from "./constants";

const myState = {
  loading: false,
  userData: {},
  error: ""
};

// eslint-disable-next-line default-param-last
const authentication = (state = myState, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      loading: true
    };

  case LOGIN_SUCCESS:
    return {
      ...state,
      loading: true,
      userData: action.payload
    };

  case LOGIN_FAILED:
    return {
      ...state,
      loading: false,
      userData: {},
      error: action.payload
    };

  default:
    return state;
  }
};

export default authentication;
