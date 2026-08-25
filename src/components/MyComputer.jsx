import { WindowDropDowns } from "./WindowDropDowns";
import dropDownData from "./dropDownData";
import go from "../assets/windowsIcons/290.png";
import search from "../assets/windowsIcons/299(32x32).png";
import computer from "../assets/windowsIcons/676(16x16).png";
import back from "../assets/windowsIcons/back.png";
import forward from "../assets/windowsIcons/forward.png";
import up from "../assets/windowsIcons/up.png";
import viewInfo from "../assets/windowsIcons/view-info.ico";
import remove from "../assets/windowsIcons/302(16x16).png";
import control from "../assets/windowsIcons/300(16x16).png";
import network from "../assets/windowsIcons/693(16x16).png";
import document from "../assets/windowsIcons/308(16x16).png";
import folderSmall from "../assets/windowsIcons/318(16x16).png";
import menu from "../assets/windowsIcons/358(32x32).png";
import folder from "../assets/windowsIcons/318(48x48).png";
import folderOpen from "../assets/windowsIcons/337(32x32).png";
import disk from "../assets/windowsIcons/334(48x48).png";
import cd from "../assets/windowsIcons/111(48x48).png";
import dropdown from "../assets/windowsIcons/dropdown.png";
import pullup from "../assets/windowsIcons/pullup.png";
import windows from "../assets/windowsIcons/windows.png";
import "./MyComputer.css";

export const MyComputer = ({ onClose }) => {
  function onClickOptionItem(item) {
    switch (item) {
      case "Close":
        onClose();
        break;
      default:
    }
  }
  return (
    <div className="my-computer">
      <section className="com__toolbar">
        <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
          />
        <div className="com__options"></div>
        <img className="com__windows-logo" src={windows} alt="windows" />
      </section>
      <section className="com__function_bar">
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={forward} alt="" />
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--normalize" src={up} alt="" />
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize "
            src={search}
            alt=""
          />
          <span className="com__function_bar__text">Search</span>
        </div>
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize"
            src={folderOpen}
            alt=""
          />
          <span className="com__function_bar__text">Folders</span>
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--margin12"
            src={menu}
            alt=""
          />
          <div className="com__function_bar__arrow" />
        </div>
      </section>
      <section className="com__address_bar">
        <div className="com__address_bar__title">Address</div>
        <div className="com__address_bar__content">
          <img
            src={computer}
            alt="ie"
            className="com__address_bar__content__img"
          />
          <div className="com__address_bar__content__text">My Computer</div>
          <img
            src={dropdown}
            alt="dropdown"
            className="com__address_bar__content__img"
          />
        </div>
        <div className="com__address_bar__go">
          <img className="com__address_bar__go__img" src={go} alt="go" />
          <span className="com__address_bar__go__text">Go</span>
        </div>
      </section>
      <div className="com__content">
        <div className="com__content__inner">
          <div className="com__content__left">
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  System Tasks
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={viewInfo}
                    alt="view"
                  />
                  <div className="com__content__left__card__text link">
                    View system information
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={remove}
                    alt="remove"
                  />
                  <div className="com__content__left__card__text link">
                    Add or remove programs
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Change a setting
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Other Places
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={network}
                    alt="network"
                  />
                  <div className="com__content__left__card__text link">
                    My Network Places
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={document}
                    alt="document"
                  />
                  <div className="com__content__left__card__text link">
                    My Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={folderSmall}
                    alt="folder"
                  />
                  <div className="com__content__left__card__text link">
                    Shared Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Control Panel
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Details
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <iframe
                    title="ghbtn"
                    style={{ margin: "0 0 3px -1px", height: "30px" }}
                    src="https://ghbtns.com/github-btn.html?user=ShizukuIchi&repo=winXP&type=star&count=true&size=large"
                    frameBorder="0"
                    scrolling="0"
                    width="170px"
                    height="20px"
                  />
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src="https://cdn.iconscout.com/icon/free/png-256/medium-1425876-1205067.png"
                    alt="control"
                  />
                  <a
                    href="https://medium.com/@ShizukuIchi"
                    target="_blank"
                    rel="noreferrer"
                    className="com__content__left__card__text link"
                  >
                    Medium
                  </a>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={"react.svg"}
                    alt="control"
                  />
                  <a
                    href="https://github.com/ShizukuIchi/minesweeper"
                    target="_blank"
                    rel="noreferrer"
                    className="com__content__left__card__text link"
                  >
                    Minesweeper
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="com__content__right">
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Files Stored on This Computer
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <img
                    src={folder}
                    alt="folder"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      Shared Documents
                    </div>
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <img
                    src={folder}
                    alt="folder"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      User's Documents
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Hard Disk Drives
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <img
                    src={disk}
                    alt="disk"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      Local Disk (C:)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Devices with Removable Storage
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__img-container">
                    <img
                      src={cd}
                      alt="cd"
                      className="com__content__right__card__img"
                    />
                  </div>
                  <div className="com__content__right__card__text">
                    CD Drive (D:)
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card com__content__right__card--me">
              <div className="com__content__right__card__header">
                About Me :)
              </div>
              <div className="com__content__right__card__content">
                <a
                  href="https://github.com/ShizukuIchi"
                  target="_blank"
                  rel="noreferrer"
                  className="com__content__right__card__item--me"
                >
                  <img
                    className="com__content__right__card__img"
                    src={"react.svg"}
                    alt="control"
                  />
                  <div className="com__content__right__card__text">Github</div>
                </a>
                <a
                  href="https://sh1zuku.csie.io"
                  target="_blank"
                  rel="noreferrer"
                  className="com__content__right__card__item--me"
                >
                  <img
                    className="com__content__right__card__img"
                    src="https://a.ppy.sh/2926513_1448497605.png"
                    alt="control"
                  />
                  <div className="com__content__right__card__text">
                    My Website
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

