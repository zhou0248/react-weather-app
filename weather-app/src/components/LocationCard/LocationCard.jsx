import "./LocationCard.css";

export default function LocationCard(place) {
  return (
    <li className="card" onClick={() => {}}>
      <h3> {place.city} </h3>
      <p> {place.country} </p>
      <button className="btn" onClick={() => {}}>
        Remove
      </button>
    </li>
  );
}
