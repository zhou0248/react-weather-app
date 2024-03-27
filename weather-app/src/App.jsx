import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationBar from "./components/LocationBar/LocationBar";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import "./App.css";

/*
Assignments to the 'locationCards' variable from inside React Hook useEffect
will be lost after each render. To preserve the value over time, store it in a
useRef Hook and keep the mutable value in the '.current' property. Otherwise,
you can move this variable directly inside useEffect.*/

function App() {
  const [location, setLocation] = useState([]);
  const [message, setMessage] = useState("");
  const locationList = [];
  const api_key = "78e3b8ef24c1779db5533624c3d3a9e5";

  useEffect(() => {
    locationList.push(location);
    console.log(locationList);
  }, [location, locationList]);

  return (
    <>
      <Header />
      <Loader />
      <SearchBar
        api_key={api_key}
        setLocation={setLocation}
        message={message}
        setMessage={setMessage}
      />
      <FeedbackBar message={message} setMessage={setMessage} />
      <div>
        <LocationBar locationList={locationList} />
      </div>
    </>
  );
}

export default App;
