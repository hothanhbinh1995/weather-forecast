import RestClient from "../utils/request/RestClient";

export default class BaseService {
  constructor(configs){
    this.restClient = new RestClient(configs)
  }
}