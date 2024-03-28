import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationBar from "./components/LocationBar/LocationBar";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import Weather from "./components/Weather/Weather";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [useMetricUnits, setUseMetricUnits] = useState(true);
  const api_key = "78e3b8ef24c1779db5533624c3d3a9e5";

  function removeLocation(id) {
    setLocationList(locationList.filter((location) => location.id !== id));
    setSelectedLocation(null);
    setLocationId(null);
  }

  function getWeather(location) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${
      location.lat
    }&lon=${location.lon}&appid=${api_key}&units=${
      useMetricUnits ? "metric" : "imperial"
    }`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`No information found for City ${location.name}`);
        }
        return res.json();
      })
      .then((data) => {
        let weather = {
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          windSpeed: data.wind.speed,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };
        setWeather(weather);
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  }

  useEffect(() => {
    if (location) {
      locationList.push(location);
    }
    return () => {
      setLocation("");
    };
  }, [location]);

  return (
    <>
      <Header />
      <SearchBar
        api_key={api_key}
        setLocation={setLocation}
        message={message}
        setMessage={setMessage}
        locationList={locationList}
        setUseMetricUnits={setUseMetricUnits}
        setSelectedLocation={setSelectedLocation}
        setLocationId={setLocationId}
      />
      {message ? (
        <FeedbackBar
          message={message}
          setMessage={setMessage}
          location={location}
        />
      ) : null}
      <div className="locationList">
        {locationList.length > 0 ? (
          <LocationBar
            locationList={locationList}
            remove={removeLocation}
            selectLocation={setSelectedLocation}
            locationId={locationId}
            setLocationId={setLocationId}
          />
        ) : (
          <p> No Location Added yet</p>
        )}
      </div>
      <Weather
        selectedLocation={selectedLocation}
        getWeather={getWeather}
        weather={weather}
        setWeather={setWeather}
        useMetricUnits={useMetricUnits}
      />
    </>
  );
}

export default App;
