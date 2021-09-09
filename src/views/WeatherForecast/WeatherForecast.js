import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withReducer } from "../../store"
import { searchLocationAction, weatherForecastReducer } from "../../store/weatherForecast"
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import AutocompleteInput from "../../components/AutocompleteInput"
import useDebounceCallback from "../../utils/hooks/useDebounceCallback"



const WeatherForecast = (props) => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const foundLocations = useSelector(state => state.weatherForecast.foundLocations)

  const debouncedSearchLocation = useDebounceCallback(
    (queryText) => {
      dispatch(searchLocationAction(queryText))
    },
    500
  )

  const handleSearchInputChange = (e) => {
    const searchText = e.target.value
    debouncedSearchLocation(searchText)
    setSearchText(searchText)
  }

  return <Container>
    <Row>
      <p className="h1 text-center">Weather forecast</p>
    </Row>
    <Row>
        <AutocompleteInput placeholder="Search your city" onChange={handleSearchInputChange} value={searchText} />
      {foundLocations.map(location => <div>{location.title}</div>)}
    </Row>
  </Container>

}

export default withReducer('weatherForecast', weatherForecastReducer)(WeatherForecast)