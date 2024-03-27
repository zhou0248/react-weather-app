import { useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Weather.css";

export default function Weather({
  getWeather,
  selectedLocation,
  weather,
  setWeather,
}) {
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
      <div className="weatherDisplay">
        {weather ? (
          <>
            <p>Temperature: {weather.temp}</p>
            <p>Feels Like: {weather.feelsLike}</p>
            <p>Wind Speed: {weather.windSpeed}</p>
            <p>Min Temperature: {weather.tempMin}</p>
            <p>Max Temperature: {weather.tempMax}</p>
            <p>Description: {weather.description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weather.icon}.png`}
              alt="weather icon"
            ></img>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
