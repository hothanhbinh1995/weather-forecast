import { createAction, createAsyncAction, withActionTypePrefix } from "..";
import metaWeatherService from "../../services/metaWeatherService";

const createActionType = withActionTypePrefix("WEATHER_FORECAST");

export const searchLocationAction = createAsyncAction(
  createActionType("SEARCH_LOCATION"),
  async (queryText) => {
    if (!queryText) {
      return [];
    }

    const { data } = await metaWeatherService.searchLocation(queryText);

    return data;
  }
);

export const getLocationAction = createAsyncAction(
  createActionType("GET_LOCATION"),
  async (woeid) => {
    const { data } = await metaWeatherService.getLocation(woeid);

    return data;
  }
);

export const searchLocationEEAction = createAsyncAction(
  createActionType("SEARCH_LOCATION_EE"),
  async (queryText) => {
    if (!queryText) {
      return [];
    }

    const { data } = await metaWeatherService.searchLocation(queryText);

    return data;
  }
);

export const clearLocationAction = createAction(
  createActionType("CLEAR_LOCATION")
);
