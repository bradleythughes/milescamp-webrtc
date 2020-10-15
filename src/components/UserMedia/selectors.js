import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUserMedia = (state) => state.userMedia || initialState;

const createUserMediaSelector = () => createSelector(selectUserMedia, (substate) => substate);

export { createUserMediaSelector };
