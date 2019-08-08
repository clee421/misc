import { connect } from 'react-redux';
import App from './app';
import { Dispatch } from 'react';
import { WeatherActionTypes } from '../store/weather/types';
import { fetchWeatherByLatAndLong } from '../store/weather/actions';

const mapDispatchToProps = (dispatch: Dispatch<WeatherActionTypes | Function>): unknown => ({
  fetchWeather: (latitude: number, longitude: number): unknown => {
    return dispatch(fetchWeatherByLatAndLong(latitude, longitude));
  }
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
