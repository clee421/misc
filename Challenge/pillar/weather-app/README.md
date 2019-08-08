# Installation

```shell
# https://yarnpkg.com/lang/en/docs/install/#mac-stable
$ yarn # Installs the packages
$ yarn start # Starts web app
```

# Architecture

## Overview

The overall design are pieces of the [N-tier Architecture](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier). This design pattern is more commonly used for service design but they work well on client applications well.

## Utilities

### Request | `src/util/request.ts`

The `request.ts` file is designed to wrap a http client whether the implementation uses 3rd party libraries, native javascript implementaions, or custom implementation the code which utilizes the request is agnostic towards 

```javascript
// Example usage
get<WeatherResponse>(WeatherType.DAILY_FORECAST, { id: cityID })
    .then((data: WeatherResponse): void => {
      dispatch(updateCityWeatherAction({
        currentCity: data.city.id,
        [data.city.id]: data.list
      } as WeatherPayload));
    })
    .catch((error): void => console.log(error));
}
```

NOTE: There are many considerations to take here regarding the `get` parameters. Depending if the `request.ts` is meant to be an overall library for many apps or solely used for the current app the API offered will change.

## Library | `src/lib`

The `lib` folder is meant to house the files that could potentially be use more globally across many applications. 

### Components

The components library wraps `react-bootstrap` and provides an API for how the component is used. 3rd party libraries are wrapped because many times they will be switched out, overridden, or not used and wrapping the components will keep the usage agnostic to it's implementation.

## Hooks | `src/hooks`

The `hooks` folder will house global hooks meant to be used throughout the application. Local hooks will be written in the local location that it is used.

e.g. `src/components/weather-graph/weather-graph.selector.ts`

## Store | `src/store`

The `store` folder houses the reducer and redux store.

# TODO

1. Refactor the `container.ts` files as that is an old implementation style and does not utilize the `useDispatch` hook.

2. Global error handling

3. Better typing. There are many places where the typing is `any` or `unknown`.

4. Usage of `@media` query. 
