import { Provider } from 'react-redux'
import store from './store'
import WeatherForecast from './views/WeatherForecast/WeatherForecast';

function App() {
  return (
    <Provider store={store}>
      <WeatherForecast/>
    </Provider>
  );
}

export default App;
