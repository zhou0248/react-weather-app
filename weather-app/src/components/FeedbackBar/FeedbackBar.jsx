import { useEffect } from "react";
import "./FeedbackBar.css";
export default function FeedbackBar({ message, setMessage, location }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
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
