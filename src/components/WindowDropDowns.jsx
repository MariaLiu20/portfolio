import React, { useState, useRef, useEffect } from 'react';
import {WindowDropDown} from './WindowDropDown';
import './DropDowns.css'

export const WindowDropDowns = ({
  items,
  onClickItem,
  height = 20,
}) => {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');
  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function _onClickItem(name) {
    setOpenOption('');
    onClickItem(name);
  }
  function onMouseUp(e) {
    if (!dropDown.current.contains(e.target)) setOpenOption('');
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <div className="window-drop-downs" style={{ "--wdd-height": height ? `${height}px` : "20px" }} ref={dropDown}>
      {Object.keys(items).map(name => (
        <div className="drop-down" key={name}>
          <div
            key={name}
            onMouseDown={() => {
              setOpenOption(name);
            }}
            onMouseEnter={() => hoverOption(name)}
            className={`drop-down__label ${
              openOption === name ? 'drop-down__label--active' : ''
            }`}
          >
            {name}
          </div>
          {openOption === name && (
            <WindowDropDown
              onClick={_onClickItem}
              items={items[name]}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
//   display: inline-flex;
//   height: ${({ height }) => height || 20}px;
//   line-height: ${({ height }) => height || 20}px;
//   position: relative;
//   .drop-down {
//     font-size: 11px;
//     height: 100%;
//     position: relative;
//   }
//   .drop-down__label--active {
//     background-color: #1660e8;
//     color: #fff;
//   }
//   .drop-down__label {
//     padding: 0 7px;
//     &:hover {
//       background-color: #1660e8;
//       color: #fff;
//     }
//   }
// `;