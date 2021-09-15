import { mockData, testHelpers } from "utils/helpers";
import {
  clearLocationAction,
  getLocationAction,
  searchLocationAction,
  weatherForecastReducer,
} from ".";

let store;

describe("weatherForecast reducer and actions", () => {
  beforeEach(() => {
    store = testHelpers.setupStore({
      weatherForecast: weatherForecastReducer,
    });
  });

  describe("searchLocation", () => {
    it("foundLocations default state should be an empty array", () => {
      const { weatherForecast } = store.getState();

      expect(weatherForecast.foundLocations).toEqual([]);
    });

    it("searchLocationAction.fulfilled should work", () => {
      const mockSearchLocationResponse = mockData.genSearchLocationResponse();

      store.dispatch(
        searchLocationAction.fulfilled(mockSearchLocationResponse)
      );

      const { weatherForecast } = store.getState();

      expect(weatherForecast.foundLocations).toBe(mockSearchLocationResponse);
    });
  });

  describe("clearLocation", () => {
    it("should set foundLocations to empty array", () => {
      store.dispatch(
        searchLocationAction.fulfilled(mockData.genSearchLocationResponse())
      );

      store.dispatch(clearLocationAction());

      const { weatherForecast } = store.getState();

      expect(weatherForecast.foundLocations).toEqual([]);
    });
  });

  describe("getLocation", () => {
    it("locationWeather default state should match initState", () => {
      const { weatherForecast } = store.getState();

      expect(weatherForecast.locationWeather).toEqual({
        today: {},
        forecast: [],
        locationName: "",
      });
    });

    it("getLocationAction.fulfilled should work correctly", () => {
      const mockGetLocationResponse = mockData.genGetLocationResponse();
      const [today, ...forecast] = mockGetLocationResponse.consolidated_weather;

      store.dispatch(getLocationAction.fulfilled(mockGetLocationResponse));

      const { weatherForecast } = store.getState();

      expect(weatherForecast.locationWeather).toEqual({
        today,
        forecast,
        locationName: mockGetLocationResponse.title,
      });
    });
  });
});
