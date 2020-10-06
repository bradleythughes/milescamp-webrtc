import { fork } from "redux-saga/effects";
import appSaga from "./components/App/saga";

function* rootSaga() {
  yield fork(appSaga);
}

export default rootSaga;
