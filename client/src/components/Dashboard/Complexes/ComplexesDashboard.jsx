import React, { useState } from 'react';
import { ComplexForm, Publication, SearchBar } from "../..";
import { useDispatch } from "react-redux";
import { getComplexesByName } from "../../../redux/actions";

import style from "./ComplexesDashboard.module.css";

export default function ComplexesDashboard({complexes, authUser}) {
  
  const [viewForm, setViewForm] = useState({
    visible: false,
    data: {}
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getComplexesByName(value));
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
        <ComplexForm complex={viewForm.data} authUser={authUser} />
      </div>
    );
  }

  return (
    <div className={style.complexesSection}>
      <h2>TODOS LOS ALOJAMIENTOS</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.complexes}>
          {complexes?.map((complex, index) => (
            <Publication key={index} complex={complex} authUser={authUser} handleForm={handleForm} />
          ))}
        </div>
      </div>
    </div>
  );
}