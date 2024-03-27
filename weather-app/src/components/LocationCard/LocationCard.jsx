import "./LocationCard.css";

export default function LocationCard({ city, country, id, remove }) {
  return (
    <li className="card" onClick={() => {}}>
      <h3> {city} </h3>
      <p> {country} </p>
      <button
        className="btn"
        onClick={() => {
          remove(id);
        }}
      >
        Remove
      </button>
    </li>
  );
}
