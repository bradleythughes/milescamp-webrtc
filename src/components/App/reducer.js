import produce from "immer";
import { WEB_SOCKET_ON_CLOSE, WEB_SOCKET_ON_OPEN } from "./constants";

export const initialState = {
  webSocket: null,
  webSocketChannel: null,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case WEB_SOCKET_ON_OPEN:
        draft.webSocket = action.webSocket;
        draft.webSocketChannel = action.webSocketChannel;
        break;
      case WEB_SOCKET_ON_CLOSE:
        draft.webSocket = null;
        draft.webSocketChannel = null;
        break;
      default:
        break;
    }
  });
