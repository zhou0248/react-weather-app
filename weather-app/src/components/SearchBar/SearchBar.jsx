import "./SearchBar.css";
import { useState } from "react";
import { PropTypes } from "prop-types";

export default function SearchBar({
  api_key,
  setLocation,
  setMessage,
  locationList,
  setUseMetricUnits,
  setSelectedLocation,
  setLocationId,
}) {
  const [city, setCity] = useState("");

  function getGeoLocation(city) {
    if (!city) {
      setMessage("Please enter a city name");
      return;
    }

    /*TOFIX: how to handle extra/missing spaces in city names; 
    e.g. "new york" works, "newyork" -- no results.
    "yellowknife" works, "yellow knife" -- no results.
    "whitehorse" -- Canadian city, "white horse" -- US city.
    */

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`No information for City ${city}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          throw new Error(
            `${city} not found. Are you sure it's a valid city name? Please check for spelling and unnecessary/missing spaces.`
          );
        }
        let location = {
          id: crypto.randomUUID(),
          lat: data[0].lat,
          lon: data[0].lon,
          name: data[0].name,
          country: data[0].country,
        };
        const cityName = location.name.toLowerCase();
        if (checkRepeatedCity(cityName)) {
          return;
        }
        setLocation(location);
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  }

  function continueSearching(city) {
    try {
      let continueSearching = true;
      const cityName = city.toLowerCase();
      if (locationList.length >= 6) {
        continueSearching = false;
        throw new Error("You can only add up to 6 locations.");
      }
      if (checkRepeatedCity(cityName)) {
        continueSearching = false;
        throw new Error(
          "This location is already in the list, please enter another city name."
        );
      }
      return continueSearching;
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  function checkRepeatedCity(newLocationName) {
    let repeatedCity = false;
    locationList.forEach((location) => {
      const locationName = location.name.toLowerCase();
      if (locationName === newLocationName) {
        repeatedCity = true;
      }
    });
    return repeatedCity;
  }

  //TODO: separate different search fields for city, province, country
  return (
    <div className="search-bar">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (!continueSearching(city)) {
            return;
          }
          getGeoLocation(city);
        }}
      >
        <div>
          <label htmlFor="city">
            *City, Province, Country:
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              placeholder="Enter a City (required), Province, Country"
              onChange={(ev) => {
                setCity(ev.target.value);
              }}
            />
          </label>
          <button
            className="btn"
            onClick={() => {
              setCity(city);
            }}
          >
            Search
          </button>
          <div className="unitsOptions">
            <input
              type="radio"
              id="metric"
              name="metric"
              defaultChecked
              onClick={() => {
                setUseMetricUnits(true);
                setSelectedLocation(null);
                setLocationId(null);
              }}
            />
            <label htmlFor="metric">Celsius (°C)</label>
            <input
              type="radio"
              id="imperial"
              name="imperial"
              onClick={() => {
                setUseMetricUnits(false);
                setSelectedLocation(null);
                setLocationId(null);
              }}
            />
            <label htmlFor="imperial">Fahrenheit (°F)</label>
          </div>
        </div>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  api_key: PropTypes.string,
  setLocation: PropTypes.func,
  setMessage: PropTypes.func,
  locationList: PropTypes.array,
  setUseMetricUnits: PropTypes.func,
  setSelectedLocation: PropTypes.func,
  setLocationId: PropTypes.func,
};
