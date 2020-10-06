import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectApp = (state) => state.app || initialState;

const createAppSelector = () => createSelector(selectApp, (substate) => substate);

export { createAppSelector };
