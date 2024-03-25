import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationCard from "./components/LocationCard/LocationCard";
import LocationBar from "./components/LocationBar/LocationBar";
import "./App.css";
import Loader from "./components/Loader/Loader";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Loader />
      <div>
        <LocationBar />
      </div>
    </>
  );
}

export default App;
