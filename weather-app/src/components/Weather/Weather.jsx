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
      {/* {!weather && <Loader />} */}
    </>
  );
}
