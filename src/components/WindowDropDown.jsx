import React, { useState } from "react";

import iePaper from "../assets/windowsIcons/ie-paper.png";
import ieBook from "../assets/windowsIcons/ie-book.png";
import check from "../assets/windowsIcons/checked.png";
import folder from "../assets/windowsIcons/folder.png";
import "./DropDown.css";

export const WindowDropDown = ({ items, position = {}, onClick }) => {
  const [option, setOption] = useState("");
  return (
    <div {...position}>
      <div className="drop-down__menu">
        {items.map((item, index) => {
          switch (item.type) {
            case "item":
              return (
                <div
                  key={item.text}
                  className={`drop-down__row${item.disable ? "--disable" : ""}`}
                  onMouseEnter={() => setOption(item.text)}
                  onClick={() => onClick(item.text)}
                >
                  <div className="drop-down__check">
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className="drop-down__text">{item.text}</div>
                  <span className="drop-down__hot-key">
                    {item.hotkey || ""}
                  </span>
                  <div className="drop-down__arrow--disable" />
                </div>
              );
            case "menu":
              return (
                <div
                  key={item.text}
                  className={`drop-down__row${
                    option === item.text ? "--active" : ""
                  }`}
                  onMouseEnter={() => setOption(item.text)}
                >
                  <div className="drop-down__check">
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className="drop-down__text">{item.text}</div>
                  <span className="drop-down__hot-key">
                    {item.hotkey || ""}
                  </span>
                  <div className="drop-down__arrow" />
                  <div style={{ position: "relative" }}>
                    {option === item.text && (
                      <WindowDropDown
                        position={item.position}
                        items={item.items}
                        onClick={onClick}
                      />
                    )}
                  </div>
                </div>
              );
            case "separator":
              return <div key={index} className="drop-down__separator" />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

function RowSymbol({ type }) {
  switch (type) {
    case "ie-paper":
      return <img className="drop-down__icon" src={iePaper} alt="" />;
    case "ie-book":
      return <img className="drop-down__icon" src={ieBook} alt="" />;
    case "folder":
      return <img className="drop-down__icon" src={folder} alt="" />;
    case "check":
      return <img src={check} alt="" />;
    case "circle":
      return (
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#000",
          }}
        />
      );
    default:
      return null;
  }
}
