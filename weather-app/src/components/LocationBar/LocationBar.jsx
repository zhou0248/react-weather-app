import LocationCard from "../LocationCard/LocationCard";
import { useEffect, useState } from "react";
import "./LocationBar.css";

function LocationBar() {
  const location = [
    { city: "New York", country: "USA" },
    { city: "London", country: "UK" },
    { city: "Paris", country: "France" },
    { city: "Tokyo", country: "Japan" },
    { city: "Sydney", country: "Australia" },
    { city: "Berlin", country: "Germany" },
  ];
  const locationCards = location.map((place) => (
    <LocationCard city={place.city} country={place.country} key={place.city} />
  ));
  return <ul className="card-group">{locationCards}</ul>;
}

export default LocationBar;
