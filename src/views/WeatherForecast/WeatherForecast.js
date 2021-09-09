import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withReducer } from "../../store"
import { changeForecast, fetchForecast, weatherForecastReducer } from "../../store/weatherForecast"
import { Container, FormControl, InputGroup, Row, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper = styled.div`
  position:relative;
`
const SuggestionDropdownContent = styled.div`
  background-color: blue;
  position:absolute;
  width: 100%;
  bottom: 0;
  transform: translate(0, 100%);
`


const WeatherForecast = (props) => {
  const dispatch = useDispatch()
  // const forecast = useSelector(state => state.weatherForecast.forecast)

  useEffect(()=>{
    dispatch(fetchForecast())
  })

  // const handleTestReduxClick = () => {
  //   dispatch(changeForecast({ forecast: 'changed' }))
  // }

  return <Container>
    <Row>
      <p  className="h1 text-center">Weather forecast</p>
    </Row>
    <Row>
      <Wrapper>
        <InputGroup>
          <FormControl
            placeholder="Search your city"
          />
          <SuggestionDropdownContent>
            <Dropdown.Menu className="w-100 rounded-bottom" show>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
          </SuggestionDropdownContent>
          <InputGroup.Text><i class="bi-search"></i></InputGroup.Text>

        </InputGroup>
      </Wrapper>
    </Row>
  </Container>

}

export default withReducer('weatherForecast', weatherForecastReducer)(WeatherForecast)