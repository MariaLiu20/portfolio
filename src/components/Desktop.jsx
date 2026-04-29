import "./Desktop.css";
import { useState } from "react";
import { Window } from "./Window";
import { Icon } from "./Icon";
import { Mp3Player } from "./mp3Player";

export const Desktop = () => {
  // Track all windows
  const [windows, setWindows] = useState([
    { id: 1, title: "Resume", isOpen: false },
    { id: 2, title: "Work", isOpen: false },
    { id: 3, title: "Contact", isOpen: false },
    { id: 4, title: "MP3 Player", isOpen: true }
  ]);
  const [zIndexes, setZIndexes] = useState({});
  const [highestZIndex, setHighestZIndex] = useState(100);

  // Open window
  const openWindow = (id) => {
    setWindows((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: true } : p)),
    );
    bringToFront(id);
  };
  // Close window
  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOpen: false } : p)),
    );
  };

  // Bring clicked window to the front
  const bringToFront = (id) => {
    setHighestZIndex((prev) => prev + 1);
    setZIndexes((prev) => ({
      ...prev,
      [id]: highestZIndex + 1,
    }));
  };

  return (
    <>
      <Icon
        title={windows[0].title}
        imageUrl="docIcon.png"
        onActivate={() => openWindow(windows[0].id)}
        x={-600}
        y={100}
      />
      <Icon
        title={windows[1].title}
        imageUrl="docIcon.png"
        onActivate={() => openWindow(windows[1].id)}
        x={-600}
        y={180}
      />
      <Icon
        title={windows[2].title}
        imageUrl="docIcon.png"
        onActivate={() => openWindow(windows[2].id)}
        x={-600}
        y={260}
      />    
      
      <Window
        title={windows[0].title}
        isOpen={windows[0].isOpen}
        onClose={() => closeWindow(windows[0].id)}
        zIndex={zIndexes[windows[0].id] || 100}
        onBringToFront={() => bringToFront(windows[0].id)}
        x={200}
        y={0}
      >
        <iframe
          src="Resume%202026.docx.pdf#toolbar=0"
          style={{ width: "550px", height: "690px" }}
        ></iframe>
      </Window>

      <Window
        title={windows[1].title}
        isOpen={windows[1].isOpen}
        onClose={() => closeWindow(windows[1].id)}
        zIndex={zIndexes[windows[1].id] || 100}
        onBringToFront={() => bringToFront(windows[1].id)}
        x={600}
        y={200}
      >
        <p> All my projects </p>
        <a
          href="https://github.com/MariaLiu20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p> https://github.com/MariaLiu20 </p>
        </a>
      </Window>

      <Window
        title={windows[2].title}
        isOpen={windows[2].isOpen}
        onClose={() => closeWindow(windows[2].id)}
        zIndex={zIndexes[windows[2].id] || 100}
        onBringToFront={() => bringToFront(windows[2].id)}
        x={700}
        y={360}
      >
        <p> Message me at marialiu0220@gmail.com </p>
        <p> or hit the link below! </p>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="mailIcon.png" alt="LinkedIn" />
        </a>
      </Window>
      <Window
        title={windows[3].title}
        isOpen={windows[3].isOpen}
        onClose={() => closeWindow(windows[3].id)}
        zIndex={zIndexes[windows[3].id] || 100}
        onBringToFront={() => bringToFront(windows[3].id)}
        x={900}
        y={50}
      >
        <Mp3Player />
      </Window>
    </>
  );
};
