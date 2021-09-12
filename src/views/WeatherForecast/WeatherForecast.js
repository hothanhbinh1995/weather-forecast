import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { isEmpty } from "lodash";

import withReducer from "store/utils/withReducer";
import Loader from "components/Loader";
import Icon from "components/Icon";
import { useDebounceCallback, useAsyncActionWatcher } from "utils/hooks";
import AutocompleteInput from "components/AutocompleteInput";

import {
  clearLocationAction,
  getLocationAction,
  searchLocationAction,
  weatherForecastReducer,
} from "store/weatherForecast";
import WeatherCard from "./components/WeatherCard";
import WeatherInfo from "./components/WeatherInfo";

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedWoeid, setSelectedWoeid] = useState();

  const foundLocations = useSelector(
    (state) => state.weatherForecast.foundLocations
  );
  const locationWeather = useSelector(
    (state) => state.weatherForecast.locationWeather
  );

  const [isSearchLocationRunning, isGetLocationRunning] = useAsyncActionWatcher(
    searchLocationAction,
    getLocationAction
  );

  useEffect(() => {
    if (selectedWoeid) {
      dispatch(getLocationAction(selectedWoeid));
    }
  }, [dispatch, selectedWoeid]);

  const debouncedSearchLocation = useDebounceCallback((queryText) => {
    dispatch(searchLocationAction(queryText));
  }, 200);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    debouncedSearchLocation(value);
    setSearchText(value);
  };

  const handleSelectLocation = (key) => {
    setSearchText("");
    setSelectedWoeid(key);
    dispatch(clearLocationAction());
  };

  const haveWeatherInfo = !isEmpty(locationWeather.today);

  const renderContent = () => {
    if (isGetLocationRunning) {
      return (
        <div className="text-center">
          <Loader className="fs-1" />
        </div>
      );
    }
    if (!haveWeatherInfo) {
      return (
        <h5 className="text-center">
          Please search your city to see the weather forecast
        </h5>
      );
    }

    return (
      <>
        <Row className="pt-3">
          <WeatherInfo
            locationName={locationWeather.locationName}
            date={locationWeather.today.applicable_date}
            weatherState={locationWeather.today.weather_state_name}
            weatherStateCode={locationWeather.today.weather_state_abbr}
            minTemp={locationWeather.today.min_temp}
            maxTemp={locationWeather.today.max_temp}
          />
        </Row>
        <Row>
          {locationWeather.forecast.map((weather) => (
            <Col
              key={weather.applicable_date}
              className="my-2"
              sm={4}
              md={3}
              lg
            >
              <WeatherCard
                date={weather.applicable_date}
                weatherState={weather.weather_state_name}
                weatherStateCode={weather.weather_state_abbr}
                minTemp={weather.min_temp}
                maxTemp={weather.max_temp}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Weather Forecast</Navbar.Brand>
          <Form className="d-flex">
            <AutocompleteInput
              placeholder="Search your city"
              onChange={handleSearchInputChange}
              value={searchText}
              isSuggestionLoading={isSearchLocationRunning}
              rightText={
                isSearchLocationRunning ? <Loader /> : <Icon name="bi-search" />
              }
              suggestionList={foundLocations.map((location) => ({
                title: location.title,
                key: location.woeid,
              }))}
              focusFirstItemOnShow
              onSelect={handleSelectLocation}
              emptyText="Not found your city"
            />
          </Form>
        </Container>
      </Navbar>
      <Container className="py-3">{renderContent()}</Container>
    </>
  );
};

export default withReducer(
  "weatherForecast",
  weatherForecastReducer
)(WeatherForecast);
