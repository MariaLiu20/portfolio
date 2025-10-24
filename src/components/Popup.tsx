import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "xp.css/dist/XP.css";
import "./popup.css";

interface DraggablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex: number;
  onBringToFront: () => void;
}

const Popup: React.FC<DraggablePopupProps> = ({
  isOpen,
  onClose,
  children,
  zIndex,
  onBringToFront,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const popupRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    },
    [isDragging]
  );

  const onMouseUp = () => setIsDragging(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    onBringToFront();
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  if (!isOpen) return null;

  return (
    <div
      className="popup-wrapper"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex,
        pointerEvents: "auto",
      }}
      onClick={onBringToFront}
    >
      <div
        className="window"
        ref={popupRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: zIndex + 1,
        }}
      >
        <div className="popup-header title-bar" onMouseDown={onMouseDown}>
          <div className="title-bar-text">Resume</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div className="window-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
