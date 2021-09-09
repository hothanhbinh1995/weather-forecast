import { createAction, withActionTypePrefix } from "..";

const createActionType = withActionTypePrefix("WEATHER_FORECAST")

export const changeForecast = createAction(createActionType("CHANGE_FORECAST"), (payload) => {
  payload.proxy = true

  return payload
})