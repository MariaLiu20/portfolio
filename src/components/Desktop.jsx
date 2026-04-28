import "./Desktop.css";
import { useState } from "react";
import { Popup } from "./Popup";
import { Icon } from "./Icon";

export const Desktop = () => {
  // Track all popups
  const [popups, setPopups] = useState([
    { id: 1, title: "Resume", isOpen: false },
    { id: 2, title: "Work", isOpen: false },
    { id: 3, title: "Contact", isOpen: false },
  ]);
  const [zIndexes, setZIndexes] = useState({});
  const [highestZIndex, setHighestZIndex] = useState(100);

  // Open popup
  const openPopup = (id) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: true } : p)),
    );
    console.log("Opening popup with id:", id);
    bringToFront(id);
  };
  // Close popup
  const closePopup = (id) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: false } : p)),
    );
  };

  // Bring clicked popup to the front
  const bringToFront = (id) => {
    setHighestZIndex((prev) => prev + 1);
    setZIndexes((prev) => ({
      ...prev,
      [id]: highestZIndex + 1,
    }));
  };

  const handleKeyActivate = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPopup(id);
    }
  };

  return (
    <>
      <Icon
        title={popups[0].title}
        imageUrl="docIcon.png"
        onActivate={() => openPopup(popups[0].id)}
        onKeyActivate={(e) => handleKeyActivate(e, popups[0].id)}
      />
      <Icon
        title={popups[1].title}
        imageUrl="docIcon.png"
        onActivate={() => openPopup(popups[1].id)}
        onKeyActivate={(e) => handleKeyActivate(e, popups[1].id)}
      />
      <Icon
        title={popups[2].title}
        imageUrl="docIcon.png"
        onActivate={() => openPopup(popups[2].id)}
        onKeyActivate={(e) => handleKeyActivate(e, popups[2].id)}
      />

      <Popup
        title={popups[0].title}
        isOpen={popups[0].isOpen}
        onClose={() => closePopup(popups[0].id)}
        zIndex={zIndexes[popups[0].id] || 100}
        onBringToFront={() => bringToFront(popups[0].id)}
        x={300}
        y={100}
      >
        <iframe
          src="Resume%202026.docx.pdf#toolbar=0"
          style={{ width: "600px", height: "500px" }}
        ></iframe>
      </Popup>

      <Popup
        title={popups[1].title}
        isOpen={popups[1].isOpen}
        onClose={() => closePopup(popups[1].id)}
        zIndex={zIndexes[popups[1].id] || 100}
        onBringToFront={() => bringToFront(popups[1].id)}
        x={400}
        y={200}
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
        x={900}
        y={360}
      >
        <p> Message me at marialiu0220@gmail.com </p>
        <p> or hit the link below! </p>
        <a href="https://www.linkedin.com/">
          <img src="mailIcon.png" alt="linkedin" />
        </a>
      </Popup>
    </>
  );
};
