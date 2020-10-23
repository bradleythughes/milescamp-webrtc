import { put, select, takeEvery } from "redux-saga/effects";
import { userMediaStreamChanged } from "./actions";
import { USER_MUTE_TOGGLED, USER_VIDEO_TOGGLED } from "./constants";
import { createUserMediaSelector } from "./selectors";

export default function* () {
  yield takeEvery(USER_MUTE_TOGGLED, muteToggleSaga);
  yield takeEvery(USER_VIDEO_TOGGLED, videoToggleSaga);

  try {
    const stream = yield navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    yield put(userMediaStreamChanged(stream));
  } catch (error) {
    console.error("Failed to get user media", { error });
  }
}

function* muteToggleSaga() {
  const userMedia = yield select(createUserMediaSelector());

  const [audioTrack] = userMedia.stream.getAudioTracks();

  audioTrack.enabled = !audioTrack.enabled;
}

function* videoToggleSaga() {
  const userMedia = yield select(createUserMediaSelector());

  const [videoTrack] = userMedia.stream.getVideoTracks();

  videoTrack.enabled = !videoTrack.enabled;
}
