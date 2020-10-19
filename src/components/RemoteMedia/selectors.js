import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectRemoteMedia = (state) => state.remoteMedia || initialState;

const createRemoteMediaSelector = () => createSelector(selectRemoteMedia, (substate) => substate);

export { createRemoteMediaSelector };
