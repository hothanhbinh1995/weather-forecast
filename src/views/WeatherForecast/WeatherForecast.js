import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { withReducer } from "../../store"
import { changeForecast, weatherForecastReducer } from "../../store/weatherForecast"

const WeatherForecast = (props)=>{
  const dispatch = useDispatch()
  const forecast = useSelector(state=>state.weatherForecast.forecast)

  const handleTestReduxClick = ()=>{
    dispatch(changeForecast({forecast: 'changed'}))
  }

  return <div>
    forecast value: {forecast}
    <button onClick={handleTestReduxClick}>test redux</button>
  </div>
}

export default withReducer('weatherForecast', weatherForecastReducer)(WeatherForecast)