import { REMOTE_MEDIA_STREAM_CHANGED } from "./constants";

export const remoteMediaStreamChanged = (stream) => ({
  type: REMOTE_MEDIA_STREAM_CHANGED,
  stream,
});
