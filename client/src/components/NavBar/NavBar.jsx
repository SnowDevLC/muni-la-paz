import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLink } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
const logo = "/img/logo.webp";
const logo2 = "/img/logo2.webp";
import style from "./NavBar.module.css";
import { useState } from "react";

export default function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSocial, setIsOpenSocial] = useState(false);

  return (
    <header className={style.navHeader}>
      <nav className={style.navBar}>
        <div className={style.buttonLink}>
          <div className={style.buttonLinkMobile} onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <HiOutlineMenu className={`${style.menuOpen} ${isOpenMenu && style.open}`} />
            <VscChromeClose className={`${style.menuClose} ${isOpenMenu && style.open}`} />
          </div>
        </div>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt="Logo Municipalidad" />
          </Link>
        </div>
        <div className={style.centerNav}>
          <div className={style.logoMobile}>
            <Link to="/">
              <img src={logo} alt="Logo Municipalidad" />
            </Link>
          </div>
          <div className={style.logo2Mobile}>
            <Link to="/">
              <img src={logo2} alt="Logo Municipalidad" />
            </Link>
          </div>
          <div className={style.links}>
            <Link to="/" className={style.border}>
              Inicio
            </Link>
            <Link to="/servicios" className={style.border}>
              Servicios
            </Link>
            <Link to="/turismo" className={style.border}>
              Turismo
            </Link>
            <Link to="/institucional" className={style.border}>
              Institucional
            </Link>
            <Link to="/concejo" className={style.border}>
              Concejo Deliberante
            </Link>
            <Link to="/contacto" className={style.lastLink}>
              Contacto
            </Link>
          </div>
          <div className={style.social}>
            <a href="https://www.facebook.com/p/Municipalidad-de-La-Paz-100064654033886/" target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/muni.lapaz?igsh=eDk1Y3g3b2tlODhz" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://whatsapp.com/channel/0029VaRJQrD3LdQZxLoDNB1X" target="_blank">
              <FaWhatsapp />
            </a>
          </div>

          <div className={`${style.linksMobile} ${isOpenMenu && style.open}`}>
            <Link to="/" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Inicio
            </Link>
            <Link to="/servicios" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Servicios
            </Link>
            <Link to="/turismo" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Turismo
            </Link>
            <Link to="/institucional" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Institucional
            </Link>
            <Link to="/concejo" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Concejo Deliberante
            </Link>
            <Link to="/contacto" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              Contacto
            </Link>
          </div>
          <div className={`${style.socialMobile} ${isOpenSocial && style.open}`}>
            <a href="https://www.facebook.com/p/Municipalidad-de-La-Paz-100064654033886/" target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/muni.lapaz?igsh=eDk1Y3g3b2tlODhz" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://whatsapp.com/channel/0029VaRJQrD3LdQZxLoDNB1X" target="_blank">
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className={style.logo2}>
          <Link to="/">
            <img src={logo2} alt="Logo Municipalidad" />
          </Link>
        </div>
        <div className={style.buttonSocial}>
          <div className={style.buttonSocialMobile} onClick={() => setIsOpenSocial(!isOpenSocial)}>
            <FaLink className={`${style.menuOpen} ${isOpenSocial && style.open}`} />
            <VscChromeClose className={`${style.menuClose} ${isOpenSocial && style.open}`} />
          </div>
        </div>
      </nav>
    </header>
  );
}
