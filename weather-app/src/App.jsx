import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationBar from "./components/LocationBar/LocationBar";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import Weather from "./components/Weather/Weather";
import "./App.css";

//TODO: proptype validation
function App() {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState(null);
  const api_key = "78e3b8ef24c1779db5533624c3d3a9e5";

  function removeLocation(id) {
    setLocationList(locationList.filter((location) => location.id !== id));
  }

  //TODO: toggle between metric and imperial units
  function getWeather(location) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&units=metric`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setMessage(`No information found for City ${location.name}`);
        }
        return res.json();
      })
      .then((data) => {
        let weather = {};
        setWeather(weather);
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
          />
        ) : (
          <p> No Location Added yet</p>
        )}
      </div>
      <Weather
        selectedLocation={selectedLocation}
        getWeather={getWeather}
        weather={weather}
      />
    </>
  );
}

export default App;
