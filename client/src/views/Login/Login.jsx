import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const { VITE_BACKEND_URL } = import.meta.env;
import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./Login.module.css";
const logo = "/img/logo.webp";

export default function Login() {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

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
    event.preventDefault();
    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/users/login`, input);
      if (response.status === 200) {
        const userState = {
          email: input.email,
          name: response.data.name,
          ...(response.data.hasOwnProperty("rol") && { rol: response.data.rol }),
          ...(response.data.hasOwnProperty("passwordChanged") && { passwordChanged: response.data.passwordChanged }),
        };
        signIn({
          auth: {
            token: response.data.token,
          },
          userState: userState,
        });
        setInput({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  // if (isAuthenticated()) {
  //   return <Navigate to={"/dashboard"} replace />;
  // } else {
    return (
      <main className={style.login}>
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
              <img src={logo} alt="Logo Image" className={style.image} />
            </div>
            <form onSubmit={handleLogIn} className={style.form}>
              <div className={style.inputDiv}>
                <label>
                  Email
                  <div className={style.input}>
                    <FaUserShield className={style.icon} />
                    <input type="email" name="email" placeholder="Ingrese Email" onChange={handleInput} />
                  </div>
                </label>
              </div>
              <div className={style.inputDiv}>
                <label>
                  Contraseña
                  <div className={style.input}>
                    <BsFillShieldLockFill className={style.icon} />
                    <input type="password" name="password" placeholder="Ingrese Contraseña" onChange={handleInput} />
                  </div>
                </label>
              </div>
              <button type="submit" className={style.btn}>
                <span>Ingresar</span>
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
