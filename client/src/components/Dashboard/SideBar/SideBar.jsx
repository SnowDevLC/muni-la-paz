import React, { useState } from "react";

import { FaUsers, FaUser } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { MdDashboardCustomize, MdCabin, MdOutlineLibraryBooks } from "react-icons/md";
const logo = "/img/logo.webp";
import style from "./SideBar.module.css";

export default function SideBar({ user, signOut, onLinkClick }) {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
    setActiveLink(link);
  };

  return (
    <div className={style.sideBar}>
      <a href="/" target="_blank" className={style.logoDiv}>
        <img src={logo} alt="Image Logo" />
        <h2>Municipalidad de La Paz</h2>
      </a>
      <div className={style.menuDiv}>
        <h3 className={style.divTitle}>MENU</h3>
        <ul className={style.menuList}>
          <li
            className={`${style.listItem} ${activeLink === "" ? style.active : ""}`}
            onClick={() => handleLinkClick("")}
          >
            <div className={style.menuLink}>
              <MdDashboardCustomize className={style.icon} />
              <span className={style.smallText}>Panel</span>
            </div>
          </li>
          <li
            className={`${style.listItem} ${activeLink === "publications" ? style.active : ""}`}
            onClick={() => handleLinkClick("publications")}
          >
            <div className={style.menuLink}>
              <MdOutlineLibraryBooks className={style.icon} />
              <span className={style.smallText}>Publicaciones</span>
            </div>
          </li>
          <li
            className={`${style.listItem} ${activeLink === "complexes" ? style.active : ""}`}
            onClick={() => handleLinkClick("complexes")}
          >
            <div className={style.menuLink}>
              <MdCabin className={style.icon} />
              <span className={style.smallText}>Alojamientos</span>
            </div>
          </li>
          {user.rol && (
            <li
              className={`${style.listItem} ${activeLink === "users" ? style.active : ""}`}
              onClick={() => handleLinkClick("users")}
            >
              <div className={style.menuLink}>
                <FaUsers className={style.icon} />
                <span className={style.smallText}>Usuarios</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className={style.sideBarCard}>
        <FaUser className={style.icon} />
        <h3>{user.name}</h3>
        {user.rol && <h4>{user.rol}</h4>}
        <button onClick={signOut} className={style.btn}>
          Salir
        </button>
      </div>
      <button className={`${style.userButton} ${isOpen && style.open}`} onClick={() => setIsOpen(!isOpen)}>
        <FaUser className={`${style.icon} ${style.userIcon} ${isOpen && style.open}`} />
        <VscChromeClose className={`${style.icon} ${style.closeIcon} ${isOpen && style.open}`} />
      </button>
      <div className={`${style.sideBarCardMobile} ${isOpen && style.open}`}>
        <FaUser className={style.icon} />
        <h3>{user.name}</h3>
        {user.rol && <h4>{user.rol}</h4>}
        <button onClick={signOut} className={style.btn}>
          Salir
        </button>
      </div>
    </div>
  );
}
