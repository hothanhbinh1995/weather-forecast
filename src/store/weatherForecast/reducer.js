import { searchLocationAction } from ".";
import createReducer from "../utils/createReducer";
import { changeForecast } from "./actions";

const initialState = {
  foundLocations: []
}

export default createReducer(
  {
    [searchLocationAction.fulfilled]: (state, {payload}) => {
      return {
        ...state, foundLocations:payload
      }
    },
  },
  initialState
)