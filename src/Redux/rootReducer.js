import { combineReducers } from "redux";
import { authentication, handingKRAs, handlingGoals } from "./reducers";

const rootReducers = combineReducers({
  authentication, handingKRAs, handlingGoals
});

export default rootReducers;
