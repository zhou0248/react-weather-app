import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar({ api_key, setLocation, setMessage }) {
  const [city, setCity] = useState("");
  function getGeoLocation() {
    if (city === null || city === undefined || city === "") {
      setMessage("Please enter a city name");
      return;
    }
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`
    )
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
            `${city} not found. Are you sure it's a valid city name? Please check for spelling and unnecessary spaces.`
          );
          return;
        }
        // TODO: check for extra space in the city name
        let location = {
          id: crypto.randomUUID(),
          lat: data[0].lat,
          lon: data[0].lon,
          name: data[0].name,
          country: data[0].country,
        };
        setLocation(location);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="search-bar">
      {/* add a dropdown menu for countries */}
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          getGeoLocation();
        }}
      >
        <div>
          <label>
            *City, Country:
            <input
              value={city}
              placeholder="Enter a City Name, Country"
              onChange={(ev) => setCity(ev.target.value)}
              required
            />
          </label>
          <button>Search</button>
        </div>
      </form>
    </div>
  );
}
