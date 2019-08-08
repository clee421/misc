import { UPDATE_WEATHER_BY_CITY, WeatherState, WeatherActionTypes } from './types';

const initialState: WeatherState = {
  currentCity: null,
};

export function weatherReducer(
  state = initialState,
  action: WeatherActionTypes,
): WeatherState {
  switch (action.type) {
    case UPDATE_WEATHER_BY_CITY: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
