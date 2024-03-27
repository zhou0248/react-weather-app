import LocationCard from "../LocationCard/LocationCard";
import { useEffect, useState } from "react";
import "./LocationBar.css";

function LocationBar({
  locationList,
  remove,
  selectLocation,
  locationId,
  setLocationId,
}) {
  const locationCards = locationList.map((place) => (
    <LocationCard
      city={place.name}
      country={place.country}
      key={place.id}
      id={place.id}
      remove={remove}
      locationId={locationId}
      setLocationId={setLocationId}
    />
  ));

  function findLocation(id) {
    return locationList.find((location) => location.id === id);
  }
  useEffect(() => {
    selectLocation(findLocation(locationId));
  }, [locationId]);

  return <ul className="card-group">{locationCards}</ul>;
}

export default LocationBar;
