import LocationCard from "../LocationCard/LocationCard";
import { useEffect, useState } from "react";
import "./LocationBar.css";

function LocationBar({ locationList, removeLocation }) {
  const locationCards = locationList.map((place) => (
    <LocationCard
      city={place.name}
      country={place.country}
      key={place.id}
      remove={removeLocation}
    />
  ));
  return <ul className="card-group">{locationCards}</ul>;
}

export default LocationBar;
