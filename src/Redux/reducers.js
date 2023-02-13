/* eslint-disable no-underscore-dangle */
import {
  LOADING, LOGIN_SUCCESS,
  LOGIN_FAILED, DLT_KRA, DLT_OPEN,
  DLT_AGREE, UPDT_KRA, POST_NEW_KRA,
  DLT_GOAL, DLT_GOAL_CONFRM, UPDT_GOAL, DIALOG, SET_EDIT_MODE
} from "./constants";

const myState = {
  loading: false,
  userData: {},
  error: ""
};

// eslint-disable-next-line default-param-last
export const authentication = (state = myState, action) => {
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

const kraStates = {
  dltKRAID: "",
  dltOpen: false,
  dltAgree: false,
  kraToUpdt: {},
  kraUpdtID: "",
  newKRA: {}
};

// eslint-disable-next-line default-param-last
export const handingKRAs = (state = kraStates, action) => {
  switch (action.type) {
  case DLT_KRA:
    return {
      ...state,
      dltKRAID: action.payload

    };

  case DLT_OPEN:
    return {
      ...state,
      dltOpen: action.payload

    };
  case DLT_AGREE:
    return {
      ...state,
      dltAgree: action.payload

    };

  case UPDT_KRA:
    return {
      ...state,
      kraToUpdt: action.payload,
      kraUpdtID: (action.payload).id
    };

  case POST_NEW_KRA:
    return {
      ...state,
      newKRA: action.payload
    };

  default:
    return state;
  }
};

const goalState = {
  goalDltId: "",
  goalToUpdate: {},
  goalDltConfrm: false,
  dialougOpen: false,
  editMode: false
};

// eslint-disable-next-line default-param-last
export const handlingGoals = (state = goalState, action) => {
  switch (action.type) {
  case DLT_GOAL:
    return {
      ...state,
      goalDltId: action.payload
    };

  case DLT_GOAL_CONFRM:
    return {
      ...state,
      goalDltConfrm: action.payload
    };

  case UPDT_GOAL:
    return {
      ...state,
      goalToUpdate: action.payload
    };

  case DIALOG:
    return {
      ...state,
      dialougOpen: action.payload
    };

  case SET_EDIT_MODE:
    return {
      ...state,
      editMode: action.payload
    };

  default:
    return state;
  }
};
