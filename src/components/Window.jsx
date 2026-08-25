import { useCallback, useEffect, useRef, useState } from "react";

export const Window = ({
  title,
  isOpen,
  onClose,
  children,
  zIndex,
  onBringToFront,
  x,
  y,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Keep the window fully on-screen, no matter what x/y it was given
const MOBILE_BREAKPOINT = 600;
const ICON_RAIL_HEIGHT = 320; // clears the desktop icon column on mobile

const clampPosition = useCallback((pos) => {
  const width = windowRef.current?.offsetWidth ?? 300;
  const height = windowRef.current?.offsetHeight ?? 200;
  const isMobile = document.documentElement.clientWidth <= MOBILE_BREAKPOINT;
  const maxX = Math.max(0, document.documentElement.clientWidth - width);
  const maxY = Math.max(0, document.documentElement.clientHeight - height);
  const minY = isMobile ? Math.min(ICON_RAIL_HEIGHT, maxY) : 0;
  return {
    x: Math.min(Math.max(pos.x, 0), maxX),
    y: Math.min(Math.max(pos.y, minY), maxY),
  };
}, []);

  useEffect(() => {
    setPosition((prev) => clampPosition(prev));
    const onResize = () => setPosition((prev) => clampPosition(prev));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPosition, isOpen]);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPosition(
        clampPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        })
      );
    },
    [isDragging, clampPosition]
  );

  const onMouseUp = () => setIsDragging(false);

  const onMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
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
      style={{ position: "absolute", top: position.y, left: position.x, zIndex }}
      onClick={onBringToFront}
      className="w-[min(92vw,550px)] overflow-hidden"
    >
      <div
        className="window w-full max-h-[80vh] overflow-auto"
        ref={windowRef}
        style={{ zIndex: zIndex + 1 }}
      >
        <div className="popup-header title-bar" onMouseDown={onMouseDown}>
          <div className="title-bar-text">{title}</div>
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