import {
  clearLocationAction,
  searchLocationAction,
  getLocationAction,
} from "./actions";
import createReducer from "../utils/createReducer";

const initialState = {
  foundLocations: [],
  locationWeather: {
    today: {},
    forecast: [],
    locationName: "",
  },
};

export default createReducer(
  {
    [searchLocationAction.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        foundLocations: payload,
      };
    },
    [clearLocationAction]: (state) => {
      return {
        ...state,
        foundLocations: [],
      };
    },
    [getLocationAction.fulfilled]: (state, { payload }) => {
      const [today, ...forecast] = payload.consolidated_weather;

      return {
        ...state,
        locationWeather: {
          today,
          forecast,
          locationName: payload.title,
        },
      };
    },
  },
  initialState
);
