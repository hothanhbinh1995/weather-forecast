import { screen } from "@testing-library/react";
import React from "react";
import { testHelpers } from "utils/helpers";
import WeatherForecast from "./WeatherForecast";

describe("WeatherForecast", () => {
  it("should render correctly", async () => {
    testHelpers.renderPage(<WeatherForecast />);

    expect(screen.getByText("Weather Forecast")).toBeInTheDocument();
    expect(
      screen.getByText("Please search your city to see the weather forecast")
    ).toBeInTheDocument();
  });
});
