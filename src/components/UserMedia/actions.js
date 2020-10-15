import { USER_MEDIA_STREAM_CHANGED } from "./constants";

export const userMediaStreamChanged = (stream) => ({
  type: USER_MEDIA_STREAM_CHANGED,
  stream,
});
