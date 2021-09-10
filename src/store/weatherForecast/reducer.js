import { clearLocationAction, searchLocationAction } from "./actions";
import createReducer from "../utils/createReducer";

const initialState = {
  foundLocations: []
}

export default createReducer(
  {
    [searchLocationAction.fulfilled]: (state, { payload }) => {

      return {
        ...state, foundLocations: payload
      }
    },
    [clearLocationAction]: (state) => {

      return {
        ...state, foundLocations: []
      }
    }
  },
  initialState
)