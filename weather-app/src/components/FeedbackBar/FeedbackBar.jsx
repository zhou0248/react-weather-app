import { useEffect } from "react";
import "./FeedbackBar.css";
export default function FeedbackBar({ message, setMessage }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div className="feedback-bar">
      <p>{message}</p>
    </div>
  );
}
