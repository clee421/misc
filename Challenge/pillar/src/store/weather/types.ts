export interface WeatherState {
  currentCity: number | null;
  [cityID: number]: Weather[];
}

export interface Weather {
  dt: number,
  main:  {
    temp: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number,
  },
  weather: [{
    id:  number,
    main: string,
    description: string,
    icon: string
  }],
  // "clouds": {
  //   all: 8
  // },
  // wind: {
  //   speed: 4.77,
  //   deg: 232.505
  // },
  // snow: {
  // },
  // sys: {
  // pod: "n"
  // },
  // dt_txt: "2017-01-30 18:00:00"
}

export interface WeatherPayload {
  currentCity: number;
  [cityID: number]: Weather[];
}

export interface WeatherResponse {
  // Looks to be status code
  cod: string,

  // No idea what this is
  message: number,
  
  // Number of items inside the list
  cnt: number,
  
  // A list of weather for the city
  list: Weather[],

  // City
  city: City,

  // Country, could be "none"
  country: string,
}

export interface City {
  id: number,
  name: string,
  coord: Coordinates,
}

export interface Coordinates {
  lat: number,
  lon: number,
}

export const UPDATE_WEATHER_BY_CITY = 'UPDATE_WEATHER_BY_CITY';

interface UpdateWeatherByCity {
  type: typeof UPDATE_WEATHER_BY_CITY;
  payload: WeatherPayload;
}

export type WeatherActionTypes = UpdateWeatherByCity;
