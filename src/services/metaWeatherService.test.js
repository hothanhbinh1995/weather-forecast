import metaWeatherService from "./metaWeatherService";

jest.mock("../utils/request/RestClient");

describe("metaWeatherService", () => {
  describe("searchLocation", () => {
    it("should call restClient with correct params", async () => {
      const mockResponse = {
        data: [],
        status: 200,
      };
      const queryText = "Ho chi minh";

      const mockGet = jest.fn().mockReturnValue(mockResponse);
      metaWeatherService.restClient.get = mockGet;

      const response = await metaWeatherService.searchLocation(queryText);

      expect(response).toEqual(mockResponse);
      expect(mockGet).toHaveBeenCalledWith("location/search/", {
        params: { query: queryText },
      });
    });
  });

  describe("getLocation", () => {
    it("should call restClient with correct params", async () => {
      const mockResponse = {
        data: {},
        status: 200,
      };
      const woeid = 1235;

      const mockGet = jest.fn().mockReturnValue(mockResponse);
      metaWeatherService.restClient.get = mockGet;

      const response = await metaWeatherService.getLocation(woeid);

      expect(response).toEqual(mockResponse);
      expect(mockGet).toHaveBeenCalledWith(`location/${woeid}`);
    });
  });
});
