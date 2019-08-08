import { Dispatch } from 'react';

// Request
import { get, WeatherType } from '../../util/request';

// Types
import { WeatherPayload, UPDATE_WEATHER_BY_CITY, WeatherActionTypes, WeatherResponse } from './types';

type DispatchFn = (dispatch: any) => void;

const COUNTRY_CODE_US = 'US';

export function updateCityWeatherAction(
  newWeatherState: WeatherPayload,
): WeatherActionTypes {
  return {
    type: UPDATE_WEATHER_BY_CITY,
    payload: newWeatherState,
  };
}

// TODO: Proper error handling
// TODO: Refactor the success handling
/* eslint-disable no-console*/
export const fetchWeatherByCityID = (cityID: number): DispatchFn => (
  dispatch: Dispatch<WeatherActionTypes>,
): void => {
  get<WeatherResponse>(WeatherType.DAILY_FORECAST, { id: cityID })
    .then((data: WeatherResponse): void => {
      dispatch(updateCityWeatherAction({
        currentCity: data.city.id,
        [data.city.id]: data.list
      } as WeatherPayload));
    })
    .catch((error): void => console.log(error));
};

export const fetchWeatherByCity = (city: string, country: string = COUNTRY_CODE_US): DispatchFn => (
  dispatch: Dispatch<WeatherActionTypes>,
): void => {
  get<WeatherResponse>(WeatherType.DAILY_FORECAST, { q: `${city},${country}` })
    .then((data: WeatherResponse): void => {
      dispatch(updateCityWeatherAction({
        currentCity: data.city.id,
        [data.city.id]: data.list
      } as WeatherPayload));
    })
    .catch((error): void => console.log(error));
};

export const fetchWeatherByLatAndLong = (lat: number, lon: number): DispatchFn => (
  dispatch: Dispatch<WeatherActionTypes>,
): void => {
  get<WeatherResponse>(WeatherType.DAILY_FORECAST, { lat, lon })
    .then((data: WeatherResponse): void => {
      dispatch(updateCityWeatherAction({
        currentCity: data.city.id,
        [data.city.id]: data.list
      } as WeatherPayload));
    })
    .catch((error): void => console.log(error));
};
/* eslint-enable no-console*/
