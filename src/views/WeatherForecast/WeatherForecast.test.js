import { screen, fireEvent, waitFor } from "@testing-library/react";
import { DATE_FORMAT } from "appConstants";
import React from "react";
import metaWeatherService from "services/metaWeatherService";
import { dateHelpers, testHelpers, mockData } from "utils/helpers";
import BPromise from "bluebird";
import WeatherForecast from "./WeatherForecast";

jest.mock("services/metaWeatherService");

const searchLocationResponse = mockData.genSearchLocationResponse();
const getLocationResponse = mockData.genGetLocationResponse();

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

  it("should render not found location message", async () => {
    testHelpers.renderPage(<WeatherForecast />);
    const searchText = "fake location";
    metaWeatherService.searchLocation = jest.fn().mockReturnValue({ data: [] });

    const searchInput = screen.getByPlaceholderText("Search your city");

    fireEvent.change(searchInput, { target: { value: searchText } });

    const notFoundMessage = await screen.findByText("Not found your city");

    await waitFor(() => {
      expect(notFoundMessage).toBeVisible();
    });
  });
});
