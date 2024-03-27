import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LocationBar from "./components/LocationBar/LocationBar";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [message, setMessage] = useState("");
  const api_key = "78e3b8ef24c1779db5533624c3d3a9e5";

  function removeLocation(id) {
    setLocationList(locationList.filter((location) => location.id !== id));
  }
  //TOFIX: repeated location shouldn't be allowed
  // only 6 locations are allowed
  useEffect(() => {
    if (location) {
      locationList.push(location);
    }
    return () => {
      setLocation("");
    };
  }, [location]);

  return (
    <>
      <Header />
      <Loader />
      <SearchBar
        api_key={api_key}
        setLocation={setLocation}
        message={message}
        setMessage={setMessage}
        locationList={locationList}
      />
      <FeedbackBar
        message={message}
        setMessage={setMessage}
        location={location}
      />
      <div>
        <LocationBar locationList={locationList} remove={removeLocation} />
      </div>
    </>
  );
}

export default App;
