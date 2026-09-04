import "./Desktop.css";
import { useState } from "react";
import { Window } from "./Window";
import { Icon } from "./Icon";
import { Mp3Player } from "./mp3Player";
import { MyComputer } from "./MyComputer";
import { Footer } from "./Footer"
export const Desktop = () => {
  // Track all windows
  const [windows, setWindows] = useState([
    { id: 1, title: "Resume", isOpen: false, x: 0.1, y: 0.05 },
    { id: 2, title: "Projects", isOpen: true, x: 0.2, y: 0.2 },
    { id: 3, title: "Contact", isOpen: false, x: 0.5, y: 0.74 },
    { id: 4, title: "MP3 Player", isOpen: true, x: 0.7, y: 0.05 },
  ]);
  const [focusedWindowId, setFocusedWindowId] = useState(4);
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

    if (focusedWindowId === id) {
    setFocusedWindowId(null);
  }
  };

  // Bring clicked window to the front
  const bringToFront = (id) => {
    setFocusedWindowId(id);
    setHighestZIndex((prev) => prev + 1);
    setZIndexes((prev) => ({
      ...prev,
      [id]: highestZIndex + 1,
    }));
  };

  return (
    <>
      <div className="desktop-icons absolute left-0 top-10 w-[100px] sm:top-10">
        <Icon
          title={windows[0].title}
          imageUrl="resumeIcon.png"
          onActivate={() => openWindow(windows[0].id)}
        />
        <Icon
          title={windows[1].title}
          imageUrl="docIcon.png"
          onActivate={() => openWindow(windows[1].id)}
        />
        <Icon
          title={windows[2].title}
          imageUrl="docIcon.png"
          onActivate={() => openWindow(windows[2].id)}
        />
        <Icon
          title={windows[3].title}
          imageUrl="mp3Icon.png"
          onActivate={() => openWindow(windows[3].id)}
        />
      </div>

      <Window
        title={windows[0].title}
        isOpen={windows[0].isOpen}
        onClose={() => closeWindow(windows[0].id)}
        zIndex={zIndexes[windows[0].id] || 100}
        onBringToFront={() => bringToFront(windows[0].id)}
        x={windows[0].x * window.innerWidth}
        y={windows[0].y * window.innerWidth}
      >
        <iframe
          src="Resume%202026.docx.pdf#toolbar=0"
          className="w-full block"
          style={{ aspectRatio: "8.5 / 11" }}
        ></iframe>
      </Window>

      <Window
        title={windows[1].title}
        isOpen={windows[1].isOpen}
        onClose={() => closeWindow(windows[1].id)}
        zIndex={zIndexes[windows[1].id] || 100}
        onBringToFront={() => bringToFront(windows[1].id)}
        x={windows[1].x * window.innerWidth}
        y={windows[1].y * window.innerWidth}
      >
        <MyComputer />
      </Window>

      <Window
        title={windows[2].title}
        isOpen={windows[2].isOpen}
        onClose={() => closeWindow(windows[2].id)}
        zIndex={zIndexes[windows[2].id] || 100}
        onBringToFront={() => bringToFront(windows[2].id)}
        x={windows[2].x * window.innerWidth}
        y={windows[2].y * window.innerWidth}
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
        x={windows[3].x * window.innerWidth}
        y={windows[3].y * window.innerWidth}
      >
        <Mp3Player />
      </Window>
      <Footer
  windows={windows}
  focusedWindowId={focusedWindowId}
  onWindowClick={(id) => {
    console.log('Desktop.jsx')
    const window = windows.find((window) => window.id === id);

    if (window) {
      openWindow(id);
    }
  }}
/>
    </>
  );
};
