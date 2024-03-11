import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import style from "./Complexes.module.css";
import { getComplexesByName } from "../../redux/actions";
import { Publication, SearchBar } from "../../components";

export default function Complexes({ complexes }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getComplexesByName(value));
  };

  return (
    <div className={style.container}>
      <header className={style.imgHeader}>
        <div className={style.titleHeader}>
          <h1>Alojamientos</h1>
        </div>
      </header>
      <nav className={style.navTitles}>
        <Link to="/">Home</Link>
        <span>Alojamientos</span>
      </nav>
      <div className={style.title}>
        <h2>
          Todos<br></br>
          <span>Los Alojamientos</span>
        </h2>
      </div>
      <div className={style.search}>
        <SearchBar handleChange={handleChange} placeholder={"BUSCAR POR NOMBRE"}/>
      </div>
      <div className={style.grid}>
        {complexes?.map((complex, index) => (
          <Publication key={index} complex={complex} />
        ))}
      </div>
    </div>
  );
}
