/**
 * NOTE: Containers can be deprecated in favor of useDispatch
 */

import { connect } from 'react-redux';
import LocationSelector from './location-selector';
import { Dispatch } from 'react';
import { WeatherActionTypes } from '../../store/weather/types';
import { fetchWeatherByCity, fetchWeatherByLatAndLong } from '../../store/weather/actions';

const mapDispatchToProps = (dispatch: Dispatch<WeatherActionTypes | Function>): unknown => ({
  fetchWeatherByCoords: (latitude: number, longitude: number): unknown => {
    return dispatch(fetchWeatherByLatAndLong(latitude, longitude));
  },
  fetchWeatherByCity: (city: string): unknown => {
    return dispatch(fetchWeatherByCity(city));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(LocationSelector);
