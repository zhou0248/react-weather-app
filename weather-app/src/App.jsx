import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationCard from "./components/LocationCard/LocationCard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="card-group">
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
      </div>
    </>
  );
}

export default App;
