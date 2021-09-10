import BaseService from "./baseService";

class MetaWeatherService extends BaseService {
  constructor() {
    super({
      baseURL: "https://meta-weather.vercel.app/api"
    })
  }

  async searchLocation(queryText) {
    const { data, status } = await this.restClient.get("location/search/", { params: { query: queryText } })

    return { data, status }
  }

  async getLocation(woeid) {
    const { data, status } = await this.restClient.get(`location/${woeid}`)

    return { data, status }
  }
}

const metaWeatherService = new MetaWeatherService()

export default metaWeatherService