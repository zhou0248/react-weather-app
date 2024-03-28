import "./LocationCard.css";
import { useEffect, useState } from "react";

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
