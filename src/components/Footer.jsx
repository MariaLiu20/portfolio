import { useEffect, useState } from "react";
import "./Footer.css";
import startButton from "../assets/windowsIcons/start.png";
import "./Footer.css";
const getTime = () => {
  const date = new Date();

  let hour = date.getHours();
  const min = date.getMinutes();

  let hourPostFix = "AM";

  if (hour >= 12) {
    hourPostFix = "PM";
    hour -= 12;
  }

  if (hour === 0) {
    hour = 12;
  }

  const formattedMin = min < 10 ? `0${min}` : min;

  return `${hour}:${formattedMin} ${hourPostFix}`;
};

export const Footer = ({ windows, focusedWindowId, onWindowClick }) => {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__items left">
        <button className="footer__start">
          <img src={startButton} alt="Start" />
        </button>

        <div className="footer__windows">
          {windows
            .filter((window) => window.isOpen)
            .map((window) => (
              <button
                key={window.id}
                className={`footer__window ${
                  focusedWindowId === window.id ? "focus" : ""
                }`}
                onClick={() => {
                    onWindowClick(window.id);
                    console.log(window.title);
                }}
              >
                <span className="footer__text">
                  {window.windowTitle || window.title}
                </span>
              </button>
            ))}
        </div>
      </div>

      <div className="footer__items right">
        <span className="footer__time">{time}</span>
      </div>
    </footer>
  );
};

export default Footer;
