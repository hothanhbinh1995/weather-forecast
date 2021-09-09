import RestClient from "../utils/request/RestClient";

const metaWeatherClient = new RestClient({
  baseURL: "https://meta-weather.vercel.app/api"
})

const searchLocation = async (queryText) => {
  const {data, status} = await metaWeatherClient.get("location/search/", { params: { query: queryText } })

  return {data, status}
}

const metaWeatherService = {
  searchLocation
}

export default metaWeatherService