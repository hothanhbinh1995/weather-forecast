import { createAction, createAsyncAction, withActionTypePrefix } from "..";

const createActionType = withActionTypePrefix("WEATHER_FORECAST")

export const changeForecast = createAction(createActionType("CHANGE_FORECAST"), (payload) => {
  payload.proxy = true

  return payload
})

export const fetchForecast = createAsyncAction(createActionType("FETCH_FORECAST"), async ()=>{
  const result = fetch('https://www.metaweather.com/api/location/44418/').then(response => response.json())

  return result
})