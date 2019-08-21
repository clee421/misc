import React, { ReactElement } from 'react';

// Style
import './app.scss';

// Components
import Header from './header/header';
import LocationSelector from './location-selector/location-selector.container';
import WeatherGraph from './weather-graph/weather-graph';

type AppProps = {
  fetchWeather: Function;
}

const App: React.FC<any> = (props: AppProps): ReactElement => {
  const NYC_COORDS = {
    lat: 40.770708,
    long: -73.974051,
  };

  function fetchWeatherOfCurrentPosition(position: any) {
    props.fetchWeather(position.coords.latitude, position.coords.longitude)
  }

  function handleCurrentPositionError(_: PositionError): void {
    props.fetchWeather(NYC_COORDS.lat, NYC_COORDS.long)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      fetchWeatherOfCurrentPosition,
      handleCurrentPositionError,
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      },
    );
  } else {
    // EVAL: There's duplicate code but should be fine
    props.fetchWeather(NYC_COORDS.lat, NYC_COORDS.long)
  }

  return (
    <div className="app-container">
      <Header />
      <LocationSelector />
      <WeatherGraph />
    </div>
  );
};

export default App;
