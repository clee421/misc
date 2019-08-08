import { useSelector } from 'react-redux';

// 3rd Party
import moment from 'moment';

// Store
import { AppState } from '../../store';

// Types
import { Weather } from '../../store/weather/types';

export interface WeatherLineData {
  name: string,
  temperature: number,
  humidity: number,
  pressure: number,
}

function convertKelvinToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * 9/5 + 32;
}

// TODO: Other temp conversions

// TODO: Pressure needs to be normalized so graph looks better
// EVAL: Should the transformatin be done during selection or when data is pulled into the app
function transformOpenWeatherDataToLineData(weather: Weather[]): WeatherLineData[] {
  // EVAL: Consider using lodash
  return weather.map((w: Weather) => ({
    name: moment(w.dt * 1000).format('L'),
    temperature: convertKelvinToFahrenheit(w.main.temp),
    humidity: w.main.humidity,
    pressure: w.main.pressure,
  }))
}

export function useLineGraphWeatherData(): WeatherLineData[] {
  const weather = useSelector((state: AppState): Weather[] => {
    return state.weather.currentCity !== null
      ? state.weather[state.weather.currentCity]
      : [];
  });

  return transformOpenWeatherDataToLineData(weather);
}