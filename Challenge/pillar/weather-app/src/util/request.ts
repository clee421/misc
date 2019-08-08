const CORS_HACK = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api.openweathermap.org';
const OPEN_WEATHER_API_KEY = '65b23265bf808bfb36ba1f2b22f1116f';

export enum WeatherType {
  DAILY_FORECAST = 'DAILY_FORECAST',
}

function getWeatherURL(type?: WeatherType): string {
  const URL = CORS_HACK + API_URL;
  switch (type) {
    case WeatherType.DAILY_FORECAST:
      return URL + '/data/2.5/forecast';

    default:
      return URL;
  }
}

export function get<T = Response>(type: WeatherType, params?: {[param: string]: any}): Promise<T> {
  const GET_URL = getWeatherURL(type);
  let url = new URL(GET_URL);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  }

  url.searchParams.append('APPID', OPEN_WEATHER_API_KEY);

  return fetch(url.href, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((resp: Response) => resp.json());
}

export function post<T = any>(data: T): Promise<Response> {
  const POST_URL = getWeatherURL();
  return fetch(POST_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
