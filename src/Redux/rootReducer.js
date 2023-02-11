import { combineReducers } from "redux";
import { authentication, handingKRAs } from "./reducers";

const rootReducers = combineReducers({
  authentication, handingKRAs
});

export default rootReducers;
