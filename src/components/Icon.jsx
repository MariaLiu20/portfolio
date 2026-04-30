import { useCallback, useEffect, useRef, useState } from "react";

const iconStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  width: 40,
  textDecoration: "none",
};

const iconImageStyle = {
  width: '80%',
  height: '80%',
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: 4,
};

export const Icon = ({
  title,
  imageUrl,
  onActivate,
  onKeyActivate,
}) => {
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

      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        setHasDragged(true);
      }

      setPosition({
        x: e.clientX - startPosRef.current.x,
        y: e.clientY - startPosRef.current.y,
      });
    },
    [isDragging],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasDragged(false);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Only activate if not dragged
    if (!hasDragged) {
      onActivate();
    }
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
      className="duration-250 cursor-pointer hover:scale-105 active:scale-90"
      href="#"
      onClick={handleClick}
      onKeyDown={onKeyActivate}
      role="button"
      tabIndex={0}
      aria-label={title}
      style={{
        ...iconStyle,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={imageUrl}
        alt={title}
        style={iconImageStyle}
      />
      <p style={{ marginTop: 6, fontSize: 12, color: "black" }}>{title}</p>
    </a>
  );
};
