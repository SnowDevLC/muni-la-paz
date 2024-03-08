import React, { useState } from "react";
import { Publication, PublicationForm, SearchBar } from "../..";
import { useDispatch } from "react-redux";

import style from "./PublicationsDashboard.module.css";
import { getPublicationsByTitle } from "../../../redux/actions";

export default function PublicationsDasboard({ publications, authUser }) {

  const [viewForm, setViewForm] = useState({
    visible: false,
    data: {}
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getPublicationsByTitle(value));
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
        <PublicationForm publication={viewForm.data} authUser={authUser} />
      </div>
    );
  }


  return (
    <div className={style.publicationsSection}>
      <h2>TODAS LAS PUBLICACIONES</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.publications}>
          {publications?.map((publication, index) => (
            <Publication key={index} publication={publication} authUser={authUser} handleForm={handleForm}/>
          ))}
        </div>
      </div>
    </div>
  );
}
