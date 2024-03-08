import React, {useEffect, useState} from "react";

import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import style from "./Register.module.css";
import logo from '../../assets/logo.png';

export default function Register() {

  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
});

  const handleInput = function (event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogIn = async function (event) {
    // event.preventDefault();
    // try {
    //   const response = await axios.post(`${VITE_BACKEND_URL}/login`, input);
    //   if (response.status === 200) {
    //     console.log(response.data);
    //     Cookies.set("accessTrue", response.data.token, {
    //       expires: 30, // 30 días de duración
    //       secure: true, // Solo enviar la cookie sobre HTTPS
    //       sameSite: "strict", // Permitir la cookie en solicitudes de diferentes sitios
    //     });
    //     dispatch(setActiveUser());
    //     setInput({
    //       name: "",
    //       password: "",
    //     });
    //     dispatch(setActiveUser());
    //     if (detail === "true") {
    //       router.push(`/${itemId}`);
    //     } else {
    //       router.push("/");
    //     }
    //   }
    // } catch (error) {
    //   setUserLogin("failure");
    //   setLoginError(error.response.data.error);
    // }
  };

  return (
    <main className={style.register}>
      <div className={style.container}>
        <div className={style.rightDiv}>
          <div className={style.textDiv}>
            <h2>Acceso a personal municipal</h2>
            <p>Esta aplicación es de uso exclusivo para empleados de la Municipalidad de La Paz.</p>
          </div>
          <div className={style.footerRightDiv}>
            <h3>¿No tiene nombre de usuario?</h3>
            <span>Solicítelo al encargado del área correspondiente.</span>
          </div>
        </div>
        <div className={style.formDiv}>
          <div className={style.formHeader}>
            <img src={logo} alt="Logo Image" className={style.image}/>
          </div>
          <form action="" className={style.form}>
            <div className={style.inputDiv}>
              <label htmlFor="email">Email</label>
              <div className={style.input}>
                <MdMarkEmailRead className={style.icon} />
                <input type="text" id="email" placeholder="Ingrese Email" />
              </div>
            </div>
            <div className={style.inputDiv}>
              <label htmlFor="username">Usuario</label>
              <div className={style.input}>
                <FaUserShield className={style.icon} />
                <input type="text" id="username" placeholder="Ingrese Usuario" />
              </div>
            </div>
            <div className={style.inputDiv}>
              <label htmlFor="password">Password</label>
              <div className={style.input}>
                <BsFillShieldLockFill className={style.icon} />
                <input type="password" id="password" placeholder="Ingrese Password" />
              </div>
            </div>
            <button type="submit" className={style.btn}>
              <span>Registrar</span>
              <FaArrowRightLong className={style.icon} />
            </button>
            <span className={style.forgotPassword}>
              Olvidaste tu contraseña? <a href="">Click aquí</a>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
}