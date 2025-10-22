import { useState } from "react";
import Popup from "./components/Popup";
import "./App.css";

const App = () => {
  // Track all popups and whether they are open
  const [popups, setPopups] = useState([
    { id: 1, title: "Popup 1", isOpen: false },
    { id: 2, title: "Popup 2", isOpen: false },
    { id: 3, title: "Popup 3", isOpen: false },
  ]);

  // Manage z-index values for each popup
  const [zIndexes, setZIndexes] = useState({});
  const [highestZIndex, setHighestZIndex] = useState(100);

  // Open popup
  const openPopup = (id) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: true } : p))
    );
    bringToFront(id);
  };

  // Close popup
  const closePopup = (id) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: false } : p))
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

  return (
    <div className="app-container">
      <h1>Multiple Draggable Popups</h1>

      <div className="buttons">
        {popups.map((popup) => (
          <button key={popup.id} onClick={() => openPopup(popup.id)}>
            Open {popup.title}
          </button>
        ))}
      </div>

      {popups.map((popup) => (
        <Popup
          key={popup.id}
          isOpen={popup.isOpen}
          onClose={() => closePopup(popup.id)}
          zIndex={zIndexes[popup.id] || 100}
          onBringToFront={() => bringToFront(popup.id)}
        >
          <h2>{popup.title}</h2>
          <p>This is the content for {popup.title}.</p>
          <p>You can drag and stack multiple popups!</p>
        </Popup>
      ))}
    </div>
  );
};

export default App;
