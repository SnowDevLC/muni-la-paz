import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Publications.module.css";
import { Pagination, Publication, SearchBar } from "../../components";
import { filteredPublications, setCurrentPage } from "../../redux/actions";
import usePaginate from "../../hooks/usePaginate";
import { Link, useLocation } from "react-router-dom";
import { councilors, court, institutional } from "../../assets/data";

export default function Publications({ items }) {
  const { currentView, currentViewItems } = usePaginate(items);

  const publications = currentView || currentViewItems;

  const location = useLocation();

  const [filters, setFilters] = useState({
    type: "TODAS LAS CATEGORIAS",
    date: "TODAS",
    search: "",
  });

  const allTypes = [
    "TODAS LAS CATEGORIAS",
    "General",
    "Salud",
    "Institucional",
    "Deporte",
    "Concejo",
    "Cultura",
    "Servicio",
    "Turismo",
  ];
  const allDates = ["TODAS", "HOY", "ULTIMOS 3 DIAS", "ULTIMA SEMANA", "ULTIMO MES"];

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [e.target.name]: e.target.value.trim(),
      };
    });
    dispatch(setCurrentPage(1));
    dispatch(filteredPublications({ ...filters, search: e.target.value.trim() }));
  };

  const handleChangeInput = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [e.target.name]: e.target.value,
      };
    });
    dispatch(setCurrentPage(1));
    if (e.target.name === "type") {
      dispatch(filteredPublications({ ...filters, type: e.target.value }));
    } else {
      dispatch(filteredPublications({ ...filters, date: e.target.value }));
    }
  };

  return (
    <div className={style.container}>
      {location.pathname === "/concejo" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Concejo Deliberante</span>
          </nav>
          <div className={style.councilors}>
            <h1 className={style.titleCouncil}>Honorable Concejo Deliberante</h1>
            <div className={style.gridCouncilors}>
              {councilors?.map((councilor, index) => (
                <div key={index} className={style.councilor}>
                  <div className={style.imgCircle}>
                    <img className={style.imgCouncilor} src={councilor.img} alt={councilor.name} />
                  </div>
                  <p>{councilor.name}</p>
                  <p>{councilor.position}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${style.councilors} ${style.border}`}>
            <h1 className={style.titleCouncil}>Honorable Tribunal de Cuentas</h1>
            <div className={style.gridCouncilors}>
              {court?.map((councilor, index) => (
                <div key={index} className={style.councilor}>
                  <div className={style.imgCircle}>
                    <img className={style.imgCouncilor} src={councilor.img} alt={councilor.name} />
                  </div>
                  <p>{councilor.name}</p>
                  <p>{councilor.position}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.title}>
            <h2>
              Últimas<br></br>
              <span>Entradas</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/institucional" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Institucional</span>
          </nav>
          <div className={style.councilors}>
            {/* <h1 className={style.titleCouncil}>Concejales y Concejalas</h1> */}
            <div className={style.gridInstitutional}>
              {institutional?.map((councilor, index) => (
                <div key={index} className={style.councilor}>
                  <div className={style.imgCircle}>
                    <img className={style.imgCouncilor} src={councilor.img} alt={councilor.name} />
                  </div>
                  <p>{councilor.name}</p>
                  <p>{councilor.position}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.title}>
            <h2>
              Últimas<br></br>
              <span>Entradas</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/eventos" && (
        <>
          <header className={style.imgHeader}>
            <div className={style.titleHeader}>
              <h2>Agenda</h2>
            </div>
          </header>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Eventos</span>
          </nav>
          <div className={style.title}>
            <h2>
              Próximos<br></br>
              <span>Eventos</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/deportes" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Deportes</span>
          </nav>
          <div className={style.title}>
            <h2>
              Todo<br></br>
              <span>Sobre Deportes</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/salud" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Salud</span>
          </nav>
          <div className={style.title}>
            <h2>
              Todas las Noticias<br></br>
              <span>Sobre Salud</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/cultura" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Cultura</span>
          </nav>
          <div className={style.title}>
            <h2>
              Cultura<br></br>
              <span>Las Noticias</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/servicios" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Servicios</span>
          </nav>
          <div className={style.title}>
            <h2>
              Servicios<br></br>
              <span>Las Noticias</span>
            </h2>
          </div>
        </>
      )}
      {location.pathname === "/noticias" && (
        <>
          <nav className={style.navTitles}>
            <Link to="/">Home</Link>
            <span>Noticias</span>
          </nav>
          <div className={style.title}>
            <h2>
              Todas<br></br>
              <span>Las Noticias</span>
            </h2>
          </div>
          <div className={style.filters}>
            <div className={style.divInput}>
              <label>
                <select name="date" value={filters.date} onChange={handleChangeInput}>
                  {allDates?.map((date, index) => {
                    return <option key={index}>{date}</option>;
                  })}
                </select>
              </label>
            </div>
            <div className={style.divInput}>
              <label>
                <select name="type" value={filters.type} onChange={handleChangeInput}>
                  {allTypes?.map((type, index) => {
                    return <option key={index}>{type}</option>;
                  })}
                </select>
              </label>
            </div>
            <div className={style.search}>
              <SearchBar handleChange={handleChange} />
            </div>
          </div>
        </>
      )}
      <div className={style.grid}>
        {publications?.map((publication, index) => (
          <Publication key={index} publication={publication} />
        ))}
      </div>
      <Pagination items={items} />
    </div>
  );
}
