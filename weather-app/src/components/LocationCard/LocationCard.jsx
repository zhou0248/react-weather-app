import "./LocationCard.css";
import { PropTypes } from "prop-types";

export default function LocationCard({
  city,
  country,
  id,
  remove,
  setLocationId,
}) {
  return (
    <li
      className="card"
      onClick={() => {
        setLocationId(id);
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
};
