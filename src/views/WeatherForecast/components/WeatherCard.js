import React from "react";
import { Card } from "react-bootstrap";
import { DATE_FORMAT } from "constants";
import { dateHelpers } from "utils/helpers";
import WeatherState from "./WeatherState";

const WeatherCard = ({
  date,
  weatherState,
  weatherStateCode,
  minTemp,
  maxTemp,
  className,
}) => (
  <Card className={className}>
    <Card.Body className="text-center">
      <Card.Title>
        {dateHelpers.format(date, DATE_FORMAT.DAY_OF_WEEK)}
      </Card.Title>
      <Card.Subtitle className="text-muted mb-3">{weatherState}</Card.Subtitle>
      <WeatherState
        weatherState={weatherState}
        weatherStateCode={weatherStateCode}
        minTemp={minTemp}
        maxTemp={maxTemp}
      />
    </Card.Body>
  </Card>
);

export default WeatherCard;
