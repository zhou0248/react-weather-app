import { useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Weather.css";

export default function Weather({ getWeather, selectedLocation, weather }) {
  useEffect(() => {
    if (selectedLocation) {
      getWeather(selectedLocation);
    }
  }, [selectedLocation]);
  return (
    <>
      {!selectedLocation && <p> No Location Selected </p>}
      {!weather && <Loader />}
    </>
  );
}
