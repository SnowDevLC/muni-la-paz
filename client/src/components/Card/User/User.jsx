import React from "react";
import { MdEdit, MdDelete, MdCheck, MdPassword } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { getUsers } from "../../../redux/actions";

import style from "./User.module.css";
import { useDispatch } from "react-redux";

const User = ({ user, authUser, handleForm }) => {
  const dispatch = useDispatch();

  const handleActive = (value) => {
    const textAlert = value ? "habilitar" : "deshabilitar";
    Swal.fire({
      title: "Confirmación",
      text: `Confirma ${textAlert}`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateActive = {
          active: value,
        };
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/users/${user.id}`, updateActive, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getUsers(authUser.token));
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Confirmación",
      text: `Confirma ELIMINAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${VITE_BACKEND_URL}/users/${user.id}`, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getUsers(authUser.token));
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleForgottenPassword = (value) => {
    Swal.fire({
      title: "Confirmación",
      text: `Confirma rehabilitar cambio de contraseña`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const update = {
          passwordChanged: value,
        };
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/users/${user.id}`, update, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getUsers(authUser.token));
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className={style.card}>
      <h3>{user.name}</h3>
      <h4>{user.email}</h4>
      <p>{user.rol}</p>
      <div className={style.buttons}>
        <button className={`${style.btn} ${style.edit}`} name="user" onClick={(event) => handleForm(event, user)}>
          <MdEdit />
        </button>

        <button className={`${style.btn} ${style.delete}`} onClick={() => handleDelete()}>
          <MdDelete />
        </button>
        {user.active === false ? (
          <button className={`${style.btn} ${style.check}`} onClick={() => handleActive(true)}>
            <MdCheck />
          </button>
        ) : (
          <button className={`${style.btn} ${style.delete}`} onClick={() => handleActive(false)}>
            <RxCross2 />
          </button>
        )}
        {authUser.rol === "superAdmin" && user.passwordChanged !== false && (
          <button className={`${style.btn} ${style.password}`} onClick={() => handleForgottenPassword(false)}>
            <MdPassword />
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
