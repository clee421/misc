import React, { useState, ReactElement } from 'react';

// 3rd Party Library
import Dropdown from '../../lib/components/dropdown/dropdown';

// Hooks
import { useFormInput } from '../../hooks/form-input.hook';

// Style
import './location-selector.scss';

type LocationSelectorProps = {
  fetchWeatherByCoords: Function;
  fetchWeatherByCity: Function;
}

enum LocationSelectorState {
  LAT_AND_LONG = 'LAT_AND_LONG',
  CITY_NAME = 'CITY_NAME',
}

const LocationSelector: React.FC<any> = (props: LocationSelectorProps): ReactElement => {
  const latitude = useFormInput('', {
    name: 'latitude',
  });
  const longitude = useFormInput('', {
    name: 'longitude',
  });

  const city = useFormInput('', {
    name: 'city name',
  });

  const [currentState, setCurrentState] = useState(LocationSelectorState.LAT_AND_LONG);
  const menuItems = [
    {
      name: 'city name',
      onClick: () => {
        setCurrentState(LocationSelectorState.CITY_NAME)
      },
    },
    {
      name: 'latitude and longitude',
      onClick: () => {
        setCurrentState(LocationSelectorState.LAT_AND_LONG)
      },
    },
  ]

  function handleSubmit(): void {
    if (currentState === LocationSelectorState.LAT_AND_LONG) {
      handleCoordSubmit();
    } else {
      handleCitySubmit();
    }
  }

  function handleCoordSubmit(): void {
    if (isCoordInputValid()) {
      const lat = +latitude.value;
      const lon = +longitude.value;
      props.fetchWeatherByCoords(lat, lon);
    } else {
      // TODO: invalid input notification
      console.log('input is invalid');
    }
  }

  function handleCitySubmit(): void {
    if (isCityNameValid()) {
      props.fetchWeatherByCity(city.value);
    } else {
      // TODO: invalid input notification
      console.log('input is invalid');
    }
  }

  // TODO: check for edge cases here
  function isCoordInputValid(): boolean {
    return (!isNaN(+latitude.value) && !isNaN(+longitude.value));
  }

  function isCityNameValid(): boolean {
    // TODO: check more than empty string?
    return !!city.value;
  }

  // TODO: This can be better?
  function renderInputBoxes(): ReactElement {
    if (currentState === LocationSelectorState.LAT_AND_LONG) {
      return (
        <div className="input-boxes">
          <label>
            <span>Latitude</span>
            <input {...latitude} />
          </label>
          <label>
            <span>Longitude</span>
            <input {...longitude} />
          </label>
        </div>
      )
    } else {
      return (
        <div className="input-boxes">
          <label>
            <span>City Name</span>
            <input {...city} />
          </label>
        </div>
      )
    }
  }

  return (
    <div className="location-selector-container">
      <div className="dropdown-container">
        <Dropdown
          id="location-selector-dropdown"
          variant="outline-secondary"
          label={currentState === LocationSelectorState.LAT_AND_LONG ? 'latitude and longitude' : 'city name'}
          items={menuItems}
        />
      </div>

      {renderInputBoxes()}

      <div className="submit-container">
        <button type="button" onClick={handleSubmit}>
          Let's go!
        </button>
      </div>
    </div>
  );
};

export default LocationSelector;
