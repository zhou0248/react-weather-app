import { useEffect } from "react";
import { PropTypes } from "prop-types";
import "./FeedbackBar.css";
export default function FeedbackBar({ message, setMessage, location }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4500);
    return () => {
      clearTimeout(timer);
    };
  }, [message, location]);
  return (
    <div className="feedback-bar">
      <p>{message}</p>
    </div>
  );
}

FeedbackBar.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  location: PropTypes.shape({
    id: PropTypes.string,
    lat: PropTypes.number,
    lon: PropTypes.number,
    name: PropTypes.string,
    country: PropTypes.string,
  }),
};
