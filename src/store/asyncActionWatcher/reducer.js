import { addAction, removeAction } from "./actions";
import createReducer from "../utils/createReducer";

const initialState = {
  runningActions: [],
};

export default createReducer(
  {
    [addAction]: (state, { payload }) => {
      return {
        ...state,
        runningActions: [...state.runningActions, payload],
      };
    },
    [removeAction]: (state, { payload }) => {
      return {
        ...state,
        runningActions: state.runningActions.filter(
          (action) => action !== payload
        ),
      };
    },
  },
  initialState
);
