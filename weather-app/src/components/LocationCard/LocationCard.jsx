import "./LocationCard.css";

export default function LocationCard(props) {
  return (
    <li className="card" onClick={() => {}}>
      <h3> {props.city} </h3>
      <p> {props.country} </p>
      <button className="btn" onClick={() => {}}>
        Remove
      </button>
    </li>
  );
}
