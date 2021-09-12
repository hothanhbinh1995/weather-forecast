import React from 'react'

const formatTemp = (temp) => {
  if(!temp){
    return temp
  }

  return `${Math.round(temp)}°C`
}

const WeatherState = ({ className, weatherState, weatherStateCode, minTemp, maxTemp }) => (
  <div className={className}>
    <img
      className="mb-3 w-auto"
      alt={weatherState}
      src={`https://www.metaweather.com/static/img/weather/png/64/${weatherStateCode}.png`}
    />
    <div className="h6 text-muted">{formatTemp(minTemp)} - {formatTemp(maxTemp)}</div>
  </div>
)

export default WeatherState