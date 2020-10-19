import { fork } from "redux-saga/effects";
import appSaga from "./components/App/saga";
import remoteMediaSaga from "./components/RemoteMedia/saga";
import userMediaSaga from "./components/UserMedia/saga";

function* rootSaga() {
  yield fork(appSaga);
  yield fork(remoteMediaSaga);
  yield fork(userMediaSaga);
}

export default rootSaga;
