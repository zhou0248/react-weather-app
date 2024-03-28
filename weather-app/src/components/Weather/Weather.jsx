import { useEffect } from "react";
import { PropTypes } from "prop-types";
import Loader from "../Loader/Loader";
import "./Weather.css";

export default function Weather({
  getWeather,
  selectedLocation,
  weather,
  setWeather,
  useMetricUnits,
}) {
  // TODO: set a timer for loader
  let unit = useMetricUnits ? "°C" : "°F";
  useEffect(() => {
    if (selectedLocation) {
      getWeather(selectedLocation);
    }
    return () => {
      setWeather(null);
    };
  }, [selectedLocation]);
  return (
    <>
      {!selectedLocation && <p> No Location Selected </p>}
      {selectedLocation && !weather && <Loader />}
      {selectedLocation && weather && (
        <div className="weatherDisplay">
          <h3> Weather for {selectedLocation.name}</h3>
          <p>Description: {weather.description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt="weather icon"
          ></img>
          <p>
            Temperature: {weather.temp} {unit}
          </p>
          <p>
            Feels Like: {weather.feelsLike} {unit}
          </p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          <p>
            Min Temperature: {weather.tempMin} {unit}
          </p>
          <p>
            Max Temperature: {weather.tempMax} {unit}
          </p>
        </div>
      )}
    </>
  );
}

Weather.propTypes = {
  getWeather: PropTypes.func,
  selectedLocation: PropTypes.object,
  weather: PropTypes.object,
  setWeather: PropTypes.func,
  useMetricUnits: PropTypes.bool,
};
