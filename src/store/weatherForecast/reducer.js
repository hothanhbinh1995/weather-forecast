import { fetchForecast } from ".";
import createReducer from "../utils/createReducer";
import { changeForecast } from "./actions";

const initialState = {
  forecast: 'forecast',
}

export default createReducer(
  {
    [changeForecast]: (state, {payload}) => {
      const {forecast} = payload

      return {
        ...state, forecast
      }
    },
    [fetchForecast.rejected]: (state, {payload}) => {
      return {
        ...state, forecast:payload
      }
    }
  },
  initialState
)