import produce from "immer";
import {
  PEER_CONNECTION_ON_OPEN,
  PEER_CONNECTION_ON_CLOSE,
  REMOTE_MEDIA_STREAM_CHANGED,
} from "./constants";

export const initialState = {
  peerConnection: null,
  peerConnectionChannel: null,
  stream: null,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PEER_CONNECTION_ON_OPEN:
        draft.peerConnection = action.peerConnection;
        draft.peerConnectionChannel = action.peerConnectionChannel;
        break;
      case PEER_CONNECTION_ON_CLOSE:
        draft.peerConnection = null;
        draft.peerConnectionChannel = null;
        break;
      case REMOTE_MEDIA_STREAM_CHANGED:
        draft.stream = action.stream;
        break;
      default:
        break;
    }
  });
