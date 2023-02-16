import { combineReducers } from "redux";
import {
  authentication, handingKRAs, handlingGoals, handleAppraisal
} from "./reducers";

const rootReducers = combineReducers({
  authentication, handingKRAs, handlingGoals, handleAppraisal
});

export default rootReducers;
