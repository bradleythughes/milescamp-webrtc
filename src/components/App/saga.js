import { eventChannel, END } from "redux-saga";
import { call, cancel, fork, put, take, takeEvery } from "redux-saga/effects";
import { webSocketOnOpen, webSocketOnClose, webSocketOnError, webSocketOnMessage } from "./actions";
import { WEB_SOCKET_ON_CLOSE, WEB_SOCKET_SEND_MESSAGE } from "./constants";

function* startWebSocketSaga(hash) {
  const webSocket = new WebSocket("ws://localhost:3030/", hash);

  const webSocketChannel = yield call(eventChannel, (emit) => {
    webSocket.onopen = () => emit(webSocketOnOpen(webSocket, webSocketChannel));
    webSocket.onerror = () => emit(webSocketOnError());
    webSocket.onclose = (event) => {
      emit(webSocketOnClose(event.code, event.reason));
      emit(END);
    };
    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        emit(webSocketOnMessage(data));
      } catch (error) {
        console.error("Failed to parse incoming WebSocket message", {
          "event.data": event.data,
          error,
        });
      }
    };

    return () => webSocket.close();
  });

  yield takeEvery(webSocketChannel, function* (action) {
    yield put({ ...action });
  });

  yield takeEvery(WEB_SOCKET_SEND_MESSAGE, ({ data }) => {
    webSocket.send(JSON.stringify(data));
  });
}

export default function* () {
  const { hash } = window.location;
  if (!hash) {
    return;
  }

  const webSocketSaga = yield fork(startWebSocketSaga, hash);
  yield take(WEB_SOCKET_ON_CLOSE);
  yield cancel(webSocketSaga);
}
