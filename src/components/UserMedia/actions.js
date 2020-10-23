import { USER_MEDIA_STREAM_CHANGED, USER_MUTE_TOGGLED, USER_VIDEO_TOGGLED } from "./constants";

export const userMediaStreamChanged = (stream) => ({
  type: USER_MEDIA_STREAM_CHANGED,
  stream,
});

export const userMuteToggled = () => ({
  type: USER_MUTE_TOGGLED,
});

export const userVideoToggled = () => ({
  type: USER_VIDEO_TOGGLED,
});
