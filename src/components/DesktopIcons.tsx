import React, { useState } from "react";
import Popup from "./Popup";
import "../App.css";

const iconStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  width: 64,
  textDecoration: "none",
  color: "inherit",
};

const iconImageStyle: React.CSSProperties = {
  width: 70,
  height: 70,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: 4,
};

const DesktopIcons = () => {
  // Track all popups and whether they are open
  const [popups, setPopups] = useState([
    { id: 1, title: "Resume", isOpen: false },
    { id: 2, title: "Work", isOpen: false },
    { id: 3, title: "Contact", isOpen: false },
  ]);

  // Manage z-index values for each popup
  const [zIndexes, setZIndexes] = useState<Record<number, number>>({});
  const [highestZIndex, setHighestZIndex] = useState(100);

  // Open popup
  const openPopup = (id: number) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: true } : p))
    );
    bringToFront(id);
  };

  // Close popup
  const closePopup = (id: number) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: false } : p))
    );
  };

  // Bring clicked popup to the front
  const bringToFront = (id: number) => {
    setHighestZIndex((prev) => prev + 1);
    setZIndexes((prev) => ({
      ...prev,
      [id]: highestZIndex + 1,
    }));
  };

  const handleKeyActivate = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPopup(id);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <a
          className="duration-250 cursor-pointer hover:scale-105 active:scale-90"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openPopup(popups[0].id);
          }}
          onKeyDown={(e) => handleKeyActivate(e, popups[0].id)}
          role="button"
          tabIndex={0}
          aria-label={popups[0].title}
          style={iconStyle}
        >
          <div
            style={{
              ...iconImageStyle,
              backgroundImage: "url('public/docIcon.png')",
            }}
          />
          <span style={{ marginTop: 6, fontSize: 12 }}>{popups[0].title}</span>
        </a>
        <a
          className="duration-250 cursor-pointer hover:scale-105 active:scale-90"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openPopup(popups[1].id);
          }}
          onKeyDown={(e) => handleKeyActivate(e, popups[1].id)}
          role="button"
          tabIndex={0}
          aria-label={popups[1].title}
          style={iconStyle}
        >
          <div
            style={{
              ...iconImageStyle,
              backgroundImage: "url('public/docIcon.png')",
            }}
          />
          <span style={{ marginTop: 6, fontSize: 12 }}>{popups[1].title}</span>
        </a>
        <a
          className="duration-250 cursor-pointer hover:scale-105 active:scale-90"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openPopup(popups[2].id);
          }}
          onKeyDown={(e) => handleKeyActivate(e, popups[2].id)}
          role="button"
          tabIndex={0}
          aria-label={popups[2].title}
          style={iconStyle}
        >
          <div
            style={{
              ...iconImageStyle,
              backgroundImage: "url('public/docIcon.png')",
            }}
          />
          <span style={{ marginTop: 6, fontSize: 12 }}>{popups[2].title}</span>
        </a>
      </div>

      <Popup
        title={popups[0].title}
        isOpen={popups[0].isOpen}
        onClose={() => closePopup(popups[0].id)}
        zIndex={zIndexes[popups[0].id] || 100}
        onBringToFront={() => bringToFront(popups[0].id)}
      >
        <iframe
          src="public\resume2025.pdf#toolbar=0"
          style={{ width: "600px", height: "500px" }}
        ></iframe>
      </Popup>

      <Popup
        title={popups[1].title}
        isOpen={popups[1].isOpen}
        onClose={() => closePopup(popups[1].id)}
        zIndex={zIndexes[popups[1].id] || 100}
        onBringToFront={() => bringToFront(popups[1].id)}
      >
        <p> All my projects </p>
        <p> https://github.com/MariaLiu20 </p>
      </Popup>

      <Popup
        title={popups[2].title}
        isOpen={popups[2].isOpen}
        onClose={() => closePopup(popups[2].id)}
        zIndex={zIndexes[popups[2].id] || 100}
        onBringToFront={() => bringToFront(popups[2].id)}
      >
        <p> Message me at marialiu0220@gmail.com </p>
        <p> or hit the link below! </p>
        <a href="https://www.linkedin.com/">
          <img src="public/mailIcon.png" alt="linkedin" />
        </a>
      </Popup>
    </>
  );
};

export default DesktopIcons;
