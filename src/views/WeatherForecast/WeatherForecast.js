import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withReducer } from "../../store"
import { clearLocationAction, getLocationAction, searchLocationAction, weatherForecastReducer } from "../../store/weatherForecast"
import { Container, Row } from 'react-bootstrap'
import AutocompleteInput from "../../components/AutocompleteInput"
import useDebounceCallback from "../../utils/hooks/useDebounceCallback"
import Icon from "../../components/Icon"

const WeatherForecast = (props) => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [selectedWoeid, setSelectedWoeid] = useState()

  const foundLocations = useSelector(state => state.weatherForecast.foundLocations)

  useEffect(()=>{
    if(selectedWoeid){
      dispatch(getLocationAction(selectedWoeid))
    }

  }, [dispatch, selectedWoeid])

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

  const handleSelectLocation = (key)=>{
    const location = foundLocations.find(location=>location.woeid === key)
    setSearchText(location.title)
    setSelectedWoeid(key)
    dispatch(clearLocationAction())
  }

  return <Container>
    <Row>
      <p className="h1 text-center">Weather forecast</p>
    </Row>
    <Row>
        <AutocompleteInput
          placeholder="Search your city"
          onChange={handleSearchInputChange}
          value={searchText}
          rightText={<Icon name="bi-search"/>}
          suggestionList={foundLocations.map(location =>({title:location.title, key: location.woeid}))}
          focusFirstItemOnShow
          onSelect={handleSelectLocation}
        />

    </Row>
  </Container>

}

export default withReducer('weatherForecast', weatherForecastReducer)(WeatherForecast)