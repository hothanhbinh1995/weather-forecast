import { createAsyncAction, withActionTypePrefix } from "..";
import metaWeatherService from "../../services/metaWeatherService";

const createActionType = withActionTypePrefix("WEATHER_FORECAST")

export const searchLocationAction = createAsyncAction(createActionType("SEARCH_LOCATION"), async (queryText)=>{
  if(!queryText){
    return []
  }

  const {data} = await metaWeatherService.searchLocation(queryText)

  return data
})
