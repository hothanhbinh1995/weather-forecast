import React from "react";
import { Col, Row } from "react-bootstrap";
import { DATE_FORMAT } from "constants";
import { dateHelpers } from "utils/helpers";
import WeatherState from "./WeatherState";

const WeatherInfo = ({
  locationName,
  date,
  weatherState,
  minTemp,
  maxTemp,
  weatherStateCode,
}) => (
  <Row>
    <Col xs={6} lg="auto">
      <Row>
        <h2>{locationName}</h2>
      </Row>
      <Row>
        <h4>Today ({dateHelpers.format(date, DATE_FORMAT.FULL_DATE)})</h4>
      </Row>
      <Row>
        <h6 className="text-muted">{weatherState}</h6>
      </Row>
    </Col>
    <Col xs={6} lg="auto">
      <Row className="d-flex justify-content-center text-center">
        <WeatherState
          weatherState={weatherState}
          weatherStateCode={weatherStateCode}
          minTemp={minTemp}
          maxTemp={maxTemp}
        />
      </Row>
    </Col>
  </Row>
);

export default WeatherInfo;
