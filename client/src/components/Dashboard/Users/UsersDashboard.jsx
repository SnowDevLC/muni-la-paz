import React, { useState } from "react";
import { SearchBar, User, UserForm } from "../..";
import { useDispatch } from "react-redux";

import style from "./UsersDashboard.module.css";
import { getUsersByName } from "../../../redux/actions";

export default function UsersDashboard({ users, authUser }) {

  const [viewForm, setViewForm] = useState({
    visible: false,
    data: {}
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getUsersByName(value, authUser.token));
  };

  const handleForm = (event, item) => {
    event.stopPropagation(); 
    const dataItem = item
    const formActive = event.currentTarget.name
    if (formActive === "cancel") {
      setViewForm({
        visible: false,
        data: {},
      });
    } else {
      setViewForm({
        visible: true,
        data: dataItem
      });
    }
  };

  if (viewForm.visible) {
    return (
      <div>
        <button className={style.btn} name="cancel" onClick={handleForm}>
          CANCELAR
        </button>
        <UserForm user={viewForm.data} authUser={authUser} />
      </div>
    );
  }

  return (
    <div className={style.usersSection}>
      <h2>TODOS LOS USUARIOS</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.users}>
          {users?.map((user, index) => user.email !== authUser.email && (
            <User key={index} user={user} authUser={authUser} handleForm={handleForm}/>
          ))}
        </div>
      </div>
    </div>
  );
}