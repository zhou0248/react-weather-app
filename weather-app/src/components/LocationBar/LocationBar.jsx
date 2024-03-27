import LocationCard from "../LocationCard/LocationCard";
import { useEffect, useState } from "react";
import "./LocationBar.css";

function LocationBar({ locationList, remove }) {
  const locationCards = locationList.map((place) => (
    <LocationCard
      city={place.name}
      country={place.country}
      key={place.id}
      id={place.id}
      remove={remove}
    />
  ));
  return <ul className="card-group">{locationCards}</ul>;
}

export default LocationBar;
