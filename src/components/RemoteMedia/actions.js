import {
  PEER_CONNECTION_ON_OPEN,
  PEER_CONNECTION_ON_CLOSE,
  REMOTE_MEDIA_STREAM_CHANGED,
} from "./constants";

export const peerConnectionOnOpen = (peerConnection, peerConnectionChannel) => ({
  type: PEER_CONNECTION_ON_OPEN,
  peerConnection,
  peerConnectionChannel,
});

export const peerConnectionOnClose = () => ({
  type: PEER_CONNECTION_ON_CLOSE,
});

export const remoteMediaStreamChanged = (stream) => ({
  type: REMOTE_MEDIA_STREAM_CHANGED,
  stream,
});
