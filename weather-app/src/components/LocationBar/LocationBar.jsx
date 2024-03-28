import LocationCard from "../LocationCard/LocationCard";
import { PropTypes } from "prop-types";
import { useEffect } from "react";
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
      selectLocation={selectLocation}
      locationList={locationList}
    />
  ));

  return <ul className="card-group">{locationCards}</ul>;
}

export default LocationBar;

LocationBar.propTypes = {
  locationList: PropTypes.array,
  remove: PropTypes.func,
  selectLocation: PropTypes.func,
  locationId: PropTypes.string,
  setLocationId: PropTypes.func,
};
