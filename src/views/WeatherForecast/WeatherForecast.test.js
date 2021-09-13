import { screen, fireEvent, waitFor } from "@testing-library/react";
import { DATE_FORMAT } from "appConstants";
import React from "react";
import metaWeatherService from "services/metaWeatherService";
import { dateHelpers, testHelpers } from "utils/helpers";
import BPromise from "bluebird";
import WeatherForecast from "./WeatherForecast";

jest.mock("services/metaWeatherService");

const searchLocationResponse = [
  {
    title: "Ho Chi Minh City",
    location_type: "City",
    woeid: "1252431",
    latt_long: "10.759180,106.662498",
  },
];

const getLocationResponse = {
  consolidated_weather: [
    {
      id: 4954227311902720,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "W",
      created: "2021-09-13T13:39:46.948863Z",
      applicable_date: "2021-09-13",
      min_temp: 24.235,
      max_temp: 30.299999999999997,
      the_temp: 30.295,
      wind_speed: 6.238869679113975,
      wind_direction: 261.8446755983993,
      air_pressure: 1006.5,
      humidity: 79,
      visibility: 7.6155253320607645,
      predictability: 77,
    },
    {
      id: 6165519087435776,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "WSW",
      created: "2021-09-13T13:39:49.781936Z",
      applicable_date: "2021-09-14",
      min_temp: 23.93,
      max_temp: 28.435000000000002,
      the_temp: 27.67,
      wind_speed: 6.228841224276891,
      wind_direction: 250.74102394521609,
      air_pressure: 1009.5,
      humidity: 86,
      visibility: 7.828034279805934,
      predictability: 77,
    },
    {
      id: 5646607472132096,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "S",
      created: "2021-09-13T13:39:52.962518Z",
      applicable_date: "2021-09-15",
      min_temp: 23.895,
      max_temp: 29.59,
      the_temp: 28.979999999999997,
      wind_speed: 4.771096460290569,
      wind_direction: 170.4477618059557,
      air_pressure: 1011.0,
      humidity: 81,
      visibility: 11.888384335480792,
      predictability: 77,
    },
    {
      id: 4829983940804608,
      weather_state_name: "Light Rain",
      weather_state_abbr: "lr",
      wind_direction_compass: "S",
      created: "2021-09-13T13:39:55.670484Z",
      applicable_date: "2021-09-16",
      min_temp: 23.705,
      max_temp: 31.689999999999998,
      the_temp: 30.47,
      wind_speed: 3.7319837518492007,
      wind_direction: 173.96877185291646,
      air_pressure: 1010.0,
      humidity: 75,
      visibility: 13.398627018213631,
      predictability: 75,
    },
    {
      id: 6080127218745344,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "SSW",
      created: "2021-09-13T13:39:59.151358Z",
      applicable_date: "2021-09-17",
      min_temp: 24.575,
      max_temp: 31.49,
      the_temp: 30.905,
      wind_speed: 4.362714596858347,
      wind_direction: 211.64241061683472,
      air_pressure: 1009.5,
      humidity: 74,
      visibility: 10.521057026962538,
      predictability: 77,
    },
    {
      id: 6575817984311296,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "SW",
      created: "2021-09-13T13:40:02.084240Z",
      applicable_date: "2021-09-18",
      min_temp: 24.585,
      max_temp: 32.415,
      the_temp: 30.35,
      wind_speed: 3.293659627773801,
      wind_direction: 224.0,
      air_pressure: 1010.0,
      humidity: 77,
      visibility: 9.999726596675416,
      predictability: 77,
    },
  ],
  title: "Ho Chi Minh City",
  location_type: "City",
  woeid: 1252431,
};

describe("WeatherForecast", () => {
  it("should render correctly", () => {
    testHelpers.renderPage(<WeatherForecast />);

    expect(screen.getByText("Weather Forecast")).toBeVisible();
    expect(
      screen.getByText("Please search your city to see the weather forecast")
    ).toBeVisible();
  });

  it("should call searchLocation service when typing in search input", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "Ho Chi Minh";
    metaWeatherService.searchLocation = jest
      .fn()
      .mockReturnValue({ data: searchLocationResponse });
    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    await waitFor(() => {
      expect(metaWeatherService.searchLocation).toHaveBeenCalledWith(
        searchText
      );
    });
  });

  it("should hide dropdown when click on search result", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "Ho Chi Minh";
    metaWeatherService.searchLocation = jest
      .fn()
      .mockReturnValue({ data: searchLocationResponse });
    metaWeatherService.getLocation = jest
      .fn()
      .mockReturnValue({ data: getLocationResponse });
    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    const searchResultDropdownItem = await screen.findByText(
      "Ho Chi Minh City"
    );

    expect(searchResultDropdownItem).toBeVisible();
    fireEvent.click(searchResultDropdownItem);
    expect(searchResultDropdownItem).not.toBeVisible();
  });

  it("should call getLocationService when click on search result", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "Ho Chi Minh";
    metaWeatherService.searchLocation = jest
      .fn()
      .mockReturnValue({ data: searchLocationResponse });
    metaWeatherService.getLocation = jest
      .fn()
      .mockReturnValue({ data: getLocationResponse });

    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    const searchResultDropdownItem = await screen.findByText(
      "Ho Chi Minh City"
    );

    fireEvent.click(searchResultDropdownItem);

    await waitFor(() => {
      expect(metaWeatherService.getLocation).toHaveBeenCalledWith(
        searchLocationResponse[0].woeid
      );
    });
  });

  it("should render today forecast", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "Ho Chi Minh";
    metaWeatherService.searchLocation = jest
      .fn()
      .mockReturnValue({ data: searchLocationResponse });
    metaWeatherService.getLocation = jest
      .fn()
      .mockReturnValue({ data: getLocationResponse });

    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    const searchResultDropdownItem = await screen.findByText(
      "Ho Chi Minh City"
    );

    fireEvent.click(searchResultDropdownItem);
    expect(searchResultDropdownItem).not.toBeVisible();

    const todayLocation = await screen.findByText("Ho Chi Minh City");

    expect(todayLocation).toBeVisible();
  });

  it("should render 5 days forecast", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "Ho Chi Minh";
    metaWeatherService.searchLocation = jest
      .fn()
      .mockReturnValue({ data: searchLocationResponse });
    metaWeatherService.getLocation = jest
      .fn()
      .mockReturnValue({ data: getLocationResponse });

    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    const searchResultDropdownItem = await screen.findByText(
      "Ho Chi Minh City"
    );

    fireEvent.click(searchResultDropdownItem);

    await BPromise.each(
      getLocationResponse.consolidated_weather,
      async (weather, index) => {
        if (index === 0) {
          // Skip today forecast
          return;
        }
        const dayOfWeekText = await screen.findByText(
          dateHelpers.format(weather.applicable_date, DATE_FORMAT.DAY_OF_WEEK)
        );

        expect(dayOfWeekText).toBeVisible();
      }
    );
  });
});
