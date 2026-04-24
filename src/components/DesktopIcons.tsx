import { useState } from "react";
import Popup from "./Popup";
import "../App.css";

const DesktopIcons = () => {
  // Track all popups and whether they are open
  const [popups, setPopups] = useState([
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
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

  return (
    <>
      <div className="buttons centered-container">
        {popups.map((popup) => (
          <button key={popup.id} onClick={() => openPopup(popup.id)}>
            Open {popup.title}
          </button>
        ))}
      </div>
      <Popup
        key="Resume"
        title="Resume"
        isOpen={popups[0].isOpen}
        onClose={() => closePopup(popups[0].id)}
        zIndex={zIndexes[popups[0].id] || 100}
        onBringToFront={() => bringToFront(popups[0].id)}
      >
        <iframe
          src="/Resume 2026.docx.pdf#toolbar=0"
          style={{ width: "600px", height: "500px" }}
        ></iframe>
      </Popup>
      <Popup
        key={2}
        isOpen={popups[1].isOpen}
        onClose={() => closePopup(popups[1].id)}
        zIndex={zIndexes[popups[1].id] || 100}
        onBringToFront={() => bringToFront(popups[1].id)}
      >
        <p>This is the content for .</p>
        <p>You can drag and stack multiple popups!</p>
      </Popup>
      <Popup
        key={3}
        isOpen={popups[2].isOpen}
        onClose={() => closePopup(popups[2].id)}
        zIndex={zIndexes[popups[2].id] || 100}
        onBringToFront={() => bringToFront(popups[2].id)}
      >
        <p>This is the content for .</p>
        <p>You can drag and stack multiple popups!</p>
      </Popup>
    </>
  );
};
export default DesktopIcons;
