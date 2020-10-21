import { put } from "redux-saga/effects";
import { userMediaStreamChanged } from "./actions";

export default function* () {
  try {
    const stream = yield navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    yield put(userMediaStreamChanged(stream));
  } catch (error) {
    console.error("Failed to get user media", { error });
  }
}
