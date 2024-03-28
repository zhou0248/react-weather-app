import "./LocationCard.css";
import { PropTypes } from "prop-types";

export default function LocationCard({
  city,
  country,
  id,
  remove,
  setLocationId,
  selectLocation,
  locationList,
}) {
  function findLocation(id) {
    return locationList.find((location) => location.id === id);
  }

  return (
    <li
      className="card"
      onClick={() => {
        setLocationId(id);
        selectLocation(findLocation(id));
      }}
    >
      <h3> {city} </h3>
      <p> {country} </p>
      <span
        className="btn"
        onClick={(ev) => {
          remove(id);
          ev.stopPropagation();
        }}
      >
        Remove
      </span>
    </li>
  );
}

LocationCard.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  id: PropTypes.string,
  remove: PropTypes.func,
  setLocationId: PropTypes.func,
  selectLocation: PropTypes.func,
  locationList: PropTypes.array,
};
