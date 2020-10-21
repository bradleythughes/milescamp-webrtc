import { eventChannel } from "redux-saga";
import { all, call, cancel, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { peerConnectionOnClose, peerConnectionOnOpen, remoteMediaStreamChanged } from "./actions";
import { PEER_CONNECTION_ON_OPEN, PEER_CONNECTION_ON_CLOSE } from "./constants";
import { createRemoteMediaSelector } from "./selectors";
import { webSocketSendMessage } from "../App/actions";
import { WEB_SOCKET_ON_OPEN, WEB_SOCKET_ON_MESSAGE } from "../App/constants";
import { USER_MEDIA_STREAM_CHANGED } from "../UserMedia/constants";
import { createUserMediaSelector } from "../UserMedia/selectors";

function* startPeerConnectionSaga() {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
  });

  const userMedia = yield select(createUserMediaSelector());
  userMedia.stream.getTracks().forEach((track) => peerConnection.addTrack(track, userMedia.stream));

  const peerConnectionChannel = yield call(eventChannel, (emit) => {
    peerConnection.ontrack = ({ streams }) => {
      const [stream] = streams;
      emit(remoteMediaStreamChanged(stream));
    };
    peerConnection.onicecandidate = ({ candidate }) =>
      emit(webSocketSendMessage({ type: "icecandidate", candidate }));

    return () => {
      peerConnection.close();
      emit(remoteMediaStreamChanged(null));
      emit(peerConnectionOnClose());
    };
  });

  yield takeEvery(peerConnectionChannel, function* (action) {
    yield put({ ...action });
  });

  yield put(peerConnectionOnOpen(peerConnection, peerConnectionChannel));

  yield take(PEER_CONNECTION_ON_CLOSE);
  yield cancel();
}

function* createOffer() {
  const { peerConnection } = yield select(createRemoteMediaSelector());
  const offer = yield peerConnection.createOffer();
  yield peerConnection.setLocalDescription(offer);
  return offer;
}

function* createAnswerFromOffer(offer) {
  const { peerConnection } = yield select(createRemoteMediaSelector());
  yield peerConnection.setRemoteDescription(offer);
  const answer = yield peerConnection.createAnswer();
  yield peerConnection.setLocalDescription(answer);
  return answer;
}

function* useAnswer(answer) {
  const { peerConnection } = yield select(createRemoteMediaSelector());
  yield peerConnection.setRemoteDescription(answer);
}

function* addIceCandidate(candidate) {
  const { peerConnection } = yield select(createRemoteMediaSelector());
  if (candidate) {
    yield peerConnection.addIceCandidate(candidate);
  }
}

function* closePeerConnection() {
  const { peerConnectionChannel } = yield select(createRemoteMediaSelector());
  peerConnectionChannel.close();
}

export default function* () {
  yield all([take(WEB_SOCKET_ON_OPEN), take(USER_MEDIA_STREAM_CHANGED)]);

  yield takeEvery(`${WEB_SOCKET_ON_MESSAGE}/start`, function* () {
    yield fork(startPeerConnectionSaga);
    yield take(PEER_CONNECTION_ON_OPEN);

    const offer = yield call(createOffer);
    yield put(webSocketSendMessage({ type: "offer", offer }));
  });

  yield takeEvery(`${WEB_SOCKET_ON_MESSAGE}/offer`, function* ({ offer }) {
    yield fork(startPeerConnectionSaga);
    yield take(PEER_CONNECTION_ON_OPEN);

    const answer = yield call(createAnswerFromOffer, offer);
    yield put(webSocketSendMessage({ type: "answer", answer }));
  });

  yield takeEvery(`${WEB_SOCKET_ON_MESSAGE}/answer`, function* ({ answer }) {
    yield call(useAnswer, answer);
  });
  yield takeEvery(`${WEB_SOCKET_ON_MESSAGE}/icecandidate`, function* ({ candidate }) {
    yield call(addIceCandidate, candidate);
  });
  yield takeEvery(`${WEB_SOCKET_ON_MESSAGE}/close`, closePeerConnection);

  yield put(webSocketSendMessage({ type: "start" }));
}
