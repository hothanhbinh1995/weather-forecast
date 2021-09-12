import axios from "axios";
import { StatusCodes } from "http-status-codes";

class RestClient {
  constructor(config) {
    this.axios = axios.create(config);
  }

  get(url, config = {}) {
    return this._request(url, {
      ...config,
      method: "GET",
    });
  }

  post(url, config = {}) {
    return this._request(url, {
      ...config,
      method: "POST",
    });
  }

  put(url, config = {}) {
    return this._request(url, {
      ...config,
      method: "PUT",
    });
  }

  patch(url, config = {}) {
    return this._request(url, {
      ...config,
      method: "PATCH",
    });
  }

  delete(url, config = {}) {
    return this._request(url, {
      ...config,
      method: "DELETE",
    });
  }

  _request(url, config = {}) {
    const finalConfig = { url, ...config };
    return this.axios.request(finalConfig);
  }
}

export { StatusCodes };
export default RestClient;
