import { useCallback, useEffect, useRef, useState } from "react";

export const Icon = ({ title, imageUrl, onActivate, onKeyActivate }) => {
  const dragThreshold = 5;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
      if (deltaX > dragThreshold || deltaY > dragThreshold) setHasDragged(true);
      setPosition({
        x: e.clientX - startPosRef.current.x,
        y: e.clientY - startPosRef.current.y,
      });
    },
    [isDragging],
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasDragged(false);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!hasDragged) onActivate();
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <a
      className="duration-250 cursor-pointer hover:scale-105 active:scale-90 flex flex-col items-stretch w-10 no-underline"
      href="#"
      onClick={handleClick}
      onKeyDown={onKeyActivate}
      role="button"
      tabIndex={0}
      aria-label={title}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={imageUrl} alt={title} className="w-4/5 h-4/5 self-center bg-cover bg-center rounded" />
      <p className="mt-1.5 text-xs text-black text-center">{title}</p>
    </a>
  );
};