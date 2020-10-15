import { put } from "redux-saga/effects";
import { userMediaStreamChanged } from "./actions";

export default function* () {
  try {
    const stream = yield navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    yield put(userMediaStreamChanged(stream));
  } catch (error) {
    console.error("Failed to get user media", { error });
  }
}
