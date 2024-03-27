import "./SearchBar.css";
import { useState } from "react";
export default function SearchBar({
  api_key,
  setLocation,
  setMessage,
  locationList,
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

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setMessage(`No information found for City ${city}`);
          throw new Error(`Can not find weather information for City ${city}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setMessage(
            `${city} not found. Are you sure it's a valid city name? Please check for spelling and unnecessary/missing spaces.`
          );
          return;
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
      });
  }

  function continueSearching(city) {
    let continueSearching = true;
    const cityName = city.toLowerCase();
    if (locationList.length >= 6) {
      setMessage("You can only add up to 6 locations.");
      continueSearching = false;
      return;
    }
    if (checkRepeatedCity(cityName)) {
      continueSearching = false;
      return;
    }
    return continueSearching;
  }

  function checkRepeatedCity(newLocationName) {
    let repeatedCity = false;
    locationList.forEach((location) => {
      const locationName = location.name.toLowerCase();
      if (locationName === newLocationName) {
        setMessage(
          "This location is already in the list, please enter another city name."
        );
        repeatedCity = true;
      }
    });
    return repeatedCity;
  }

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
          <label>
            *City, Country:
            <input
              value={city}
              placeholder="Enter a City Name, Country"
              onChange={(ev) => {
                setCity(ev.target.value);
              }}
            />
          </label>
          <button
            onClick={() => {
              setCity(city);
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
