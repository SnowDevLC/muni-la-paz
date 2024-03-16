import React from "react";
import { Link } from "react-router-dom";

import style from "./Footer.module.css";
import { BiSolidLock } from "react-icons/bi";

export default function Footer() {
  return (
    <footer>
      <div className={style.topFooter}>
        <a href="tel:03544496010" className={style.contact}>
          <span>3544-496010</span>
          <p>atención al vecino</p>
        </a>
        <a href="tel:03544496600" className={style.contact}>
          <span>3544-496600</span>
          <p>comisaria</p>
        </a>
        <a href="tel:100" className={style.contact}>
          <span>100</span>
          <p>bomberos</p>
        </a>
        <Link to='/login' className={`${style.contact} ${style.login}`}>
          <span><BiSolidLock size={40}/></span>
          <p>personal municipal</p>
        </Link>
      </div>
      <div className={style.bottomFooter}>
        <div className={style.contentBottomFooter}>
          <Link>
            www.<b>munilapazcba</b>.gob.ar
          </Link>
          <span>Buenos Aires 50 - La Paz</span>
        </div>
        <div className={style.author}>
          <p>Diseño y Desarrollo <a href="https://www.linkedin.com/in/bruno-gimenez-6615a9257/" target="_blank">Bruno Gimenez</a> & <a href="https://lcdev.com.ar/" target="_blank">Luis Canales</a></p>
        </div>
      </div>
    </footer>
  );
}
