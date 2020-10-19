import { combineReducers } from "redux";
import appReducer from "./components/App/reducer";
import remoteMediaReducer from "./components/RemoteMedia/reducer";
import userMediaReducer from "./components/UserMedia/reducer";

const rootReducer = combineReducers({
  app: appReducer,
  remoteMedia: remoteMediaReducer,
  userMedia: userMediaReducer,
});

export default rootReducer;
