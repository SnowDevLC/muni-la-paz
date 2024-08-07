import { Link } from "react-router-dom";
import { Publication } from "../../components";
import { FaArrowRight, FaFacebook } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import style from "./Tourism.module.css";

const Tourism = ({ items, events, complexes }) => {
  items = items.slice(0, 4);
  events = events.filter((publication) => new Date(publication.eventDate) > new Date())
  .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)).slice(0,4);
  complexes = complexes.filter((complex) => complex.check).slice(0, 4);

  return (
    <div className={style.container}>
      <header className={style.imgHeader}>
        <div className={style.titleHeader}>
          <h1>Descubrí lo que tenemos preparado para vos</h1>
        </div>
      </header>
      <nav className={style.navTitlesTourism}>
        <div className={style.navTitles}>
          <Link to="/">Home</Link>
          <span>Turismo</span>
        </div>
        <div className={style.tourismOffice}>
          <a href="https://www.facebook.com/tursimo.lapaz.9?mibextid=ZbWKwL" target="_blank">Oficina de Turismo <FaFacebook size={30}/></a>
        </div>
      </nav>

      <div className={style.section}>
        <div className={style.titlePublications}>
          <h2>
            Buenas<br></br>
            <span>Noticias</span>
          </h2>
          <Link to="/noticias">
            Más noticias <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.grid}>
          {items?.map((publication, index) => (
            <Publication key={index} publication={publication} />
          ))}
        </div>
      </div>

      <div className={style.section}>
        <div className={style.titlePublications}>
          <h2>
            Agenda<br></br>
            <span>Proximos Eventos</span>
          </h2>
          <Link to="/eventos">
            Más eventos <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.grid}>
          {events?.map((publication, index) => (
            <Publication key={index} publication={publication} />
          ))}
        </div>
      </div>

      <div className={style.section}>
        <div className={style.titlePublications}>
          <h2>
            Alojamientos<br></br>
            <span>Disponibles</span>
          </h2>
          <Link to="/alojamientos">
            Más alojamientos <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.grid}>
          {complexes?.map((complex, index) => (
            <Publication key={index} complex={complex} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tourism;
