import produce from "immer";
import { USER_MEDIA_STREAM_CHANGED } from "./constants";

export const initialState = {
  stream: null,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_MEDIA_STREAM_CHANGED:
        draft.stream = action.stream;
        break;
      default:
        break;
    }
  });
