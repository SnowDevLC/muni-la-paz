import React, { useState } from "react";
import { ComplexForm, Publication, PublicationForm, User, UserForm } from "../../";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineNotificationsNone } from "react-icons/md";
import style from "./Panel.module.css";

export default function Panel({ authUser, notifications, publications, complexes, users }) {
  const [viewForm, setViewForm] = useState({
    visible: false,
    form: "",
    data: {},
  });

  publications = publications.filter((item) => !item.check);
  complexes = complexes.filter((item) => !item.check);
  users = users.filter((item) => !item.active);

  const handleForm = (event, item) => {
    event.stopPropagation();
    const dataItem = item;
    const formActive = event.currentTarget.name;
    if (formActive === "cancel") {
      setViewForm({
        visible: false,
        form: formActive,
        data: {},
      });
    } else {
      setViewForm({
        visible: true,
        form: formActive,
        data: dataItem,
      });
    }
  };

  if (viewForm.visible) {
    return (
      <div>
        <button className={style.btn} name="cancel" onClick={handleForm}>
          CANCELAR
        </button>
        {viewForm.form === "publication" && <PublicationForm publication={viewForm.data} authUser={authUser} />}
        {viewForm.form === "complex" && <ComplexForm complex={viewForm.data} authUser={authUser} />}
        {viewForm.form === "user" && <UserForm user={viewForm.data} authUser={authUser} />}
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.topSection}>
        <div className={style.headerSection}>
          <div className={style.title}>
            <h1>Bienvenido al Panel de Control</h1>
          </div>
          {authUser.rol && (
            <div className={style.notificationDiv}>
              <MdOutlineNotificationsNone className={style.icon} />
              {notifications > 0 && (
                <div className={style.number}>
                  <p>{notifications}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={style.panelSection}>
      <div className={style.topDiv}>
          <div className={style.heading}>
            <h3>Accesos Rápidos</h3>
          </div>
          <div className={style.buttonsAccess}>
            <button className={style.btnAccess} name="publication" onClick={handleForm}>
            <IoIosAddCircle className={style.icon} /><p>CREAR PUBLICACION</p>
            </button>

            <button className={style.btnAccess} name="complex" onClick={handleForm}>
            <IoIosAddCircle className={style.icon} /><p>CREAR ALOJAMIENTO</p>
            </button>

            {authUser.rol && (
              <button className={style.btnAccess} name="user" onClick={handleForm}>
                <IoIosAddCircle className={style.icon} /><p>CREAR USUARIO</p>
              </button>
            )}
          </div>
        </div>
        <div className={style.bottomDiv}>
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Publicaciones en revisión</h3>
            </div>
            {publications?.length !== 0 ? (
              <div className={style.itemsContainer}>
                {publications?.map((publication, index) => (
                  <Publication key={index} publication={publication} authUser={authUser} handleForm={handleForm} />
                ))}
              </div>
            ) : (
              <h2>No hay publicaciones para revisar</h2>
            )}
          </div>
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Alojamientos en revisión</h3>
            </div>
            {complexes.length !== 0 ? (
              <div className={style.itemsContainer}>
                {complexes?.map((complex, index) => (
                  <Publication key={index} complex={complex} authUser={authUser} handleForm={handleForm} />
                ))}
              </div>
            ) : (
              <h2>No hay alojamientos para revisar</h2>
            )}
          </div>
          {authUser.rol && (
            <div className={style.listDiv}>
              <div className={style.heading}>
                <h3>Usuarios en revisión</h3>
              </div>
              {users.length !== 0 ? (
                <div className={style.usersContainer}>
                  {users?.map(
                    (user, index) =>
                      user.email !== authUser.email && (
                        <User key={index} user={user} authUser={authUser} handleForm={handleForm} />
                      )
                  )}
                </div>
              ) : (
                <h2>No hay usuarios para revisar</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
