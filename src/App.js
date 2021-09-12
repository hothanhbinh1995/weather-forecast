import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import WeatherForecast from "./views/WeatherForecast/WeatherForecast";

function App() {
  return (
    <Provider store={store}>
      <WeatherForecast />
    </Provider>
  );
}

export default App;
