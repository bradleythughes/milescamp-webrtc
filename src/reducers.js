import { combineReducers } from "redux";
import appReducer from "./components/App/reducer";
import userMediaReducer from "./components/UserMedia/reducer";

const rootReducer = combineReducers({
  app: appReducer,
  userMedia: userMediaReducer,
});

export default rootReducer;
