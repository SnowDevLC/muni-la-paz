import { Carousel, Publication } from "../../components";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdCabin, MdOutlineLibraryBooks, MdEvent, MdSportsSoccer } from "react-icons/md";
import { FaHeartbeat, FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import style from "./Home.module.css";
const { VITE_BACKEND_URL, VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

export default function Home({ publications, complexes }) {
  const filteredPublications = publications
    .filter((publication) => publication.check && !publication.isEvent)
    .slice(0, 4);
  const filteredComplexes = complexes.filter((complexes) => complexes.check).slice(0, 3);
  const events = publications
    .filter((publication) => publication.check && publication.isEvent && new Date(publication.eventDate) > new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${-32.217487},${-65.049124}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <main>
      <div className={style.carrousel}>
        <Carousel />
      </div>
      <div className={style.navCenter}>
        <Link to="/alojamientos" className={style.buttonNavCenter}>
          <MdCabin className={style.icon} />
          <span>Alojamientos</span>
        </Link>
        <Link to="/cultura" className={style.buttonNavCenter}>
          <FaBook className={style.icon} />
          <span>Cultura</span>
        </Link>
        <Link to="/salud" className={style.buttonNavCenter}>
          <FaHeartbeat className={style.icon} />
          <span>Salud</span>
        </Link>
        <Link to="/deportes" className={style.buttonNavCenter}>
          <MdSportsSoccer className={style.icon} />
          <span>Deportes</span>
        </Link>
        <Link to="/noticias" className={style.buttonNavCenter}>
          <MdOutlineLibraryBooks className={style.icon} />
          <span>Noticias</span>
        </Link>
        <Link to="/eventos" className={style.buttonNavCenter}>
          <MdEvent className={style.icon} />
          <span>Eventos</span>
        </Link>
      </div>
      <section className={style.notices}>
        <div className={style.titlePublications}>
          <h2>
            Últimas<br></br>
            <span>Noticias</span>
          </h2>
          <Link to="/noticias">
            Más noticias <FaArrowRight size={25} />
          </Link>
        </div>
        <Link to={`/noticia/${filteredPublications[0]?.id}/${encodeURIComponent(filteredPublications[0]?.title).replace(/%20/g, '-')}`} className={style.firstNotice}>
          <div className={style.firstNoticeImg}>
            <img src={VITE_BACKEND_URL + filteredPublications[0]?.images[0]} alt={filteredPublications[0]?.id} />
          </div>
          <div className={style.firstNoticeText}>
            <div className={style.firstNoticeTextTop}>
              {filteredPublications[0]?.date && <small>Publicado: {format(filteredPublications[0].date, "PP")}</small>}
              <h3>{filteredPublications[0]?.title}</h3>
              <p>{filteredPublications[0]?.description}</p>
            </div>
            <div>
              <label>LEER MÁS</label>
            </div>
          </div>
        </Link>
        <div className={style.publications}>
          {filteredPublications?.map(
            (publication, index) =>
              index > 0 && <Publication key={index} publication={publication} isDetailPage={false} />
          )}
        </div>
        <Link to="/noticias" className={style.linkMobile}>
          Más noticias <FaArrowRight size={25} />
        </Link>
      </section>
      <section className={style.events}>
        <div className={style.contentEvents}>
          <div className={style.titleEvents}>
            <h2>
              Agenda<br></br>
              <span>de la Localidad de La Paz</span>
            </h2>
          </div>
          <div className={style.nextEvents}>
            <Link to="/eventos" className={style.topNextEvents}>
              <div className={style.textNextEvents}>
                <FaRegCalendarAlt size={40} />
                <span>Próximos Eventos</span>
              </div>
              <FaArrowRight size={30} />
            </Link>
            <div className={style.cardEvents}>
              {events?.map((event, index) => (
                <Link to={`/noticia/${event?.id}`} key={index} className={style.eventCard}>
                  <small>{format(event.eventDate, "PP")}</small>
                  <h3>{event.title}</h3>
                  <img src={VITE_BACKEND_URL + event.images[0]} alt={event.title} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={style.tourism}>
        <div className={style.titlePublications}>
          <h2>
            Alojamientos<br></br>
            <span>En La Pedania</span>
          </h2>
          <Link to="/alojamientos">
            Más alojamientos
            <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.publications}>
          {filteredComplexes?.map((complex, index) => (
            <Publication key={index} complex={complex} isDetailPage={false} />
          ))}
        </div>
        <Link to="/alojamientos" className={style.linkMobile}>
          Más alojamientos
          <FaArrowRight size={25} />
        </Link>
      </section>
      <section>
        <div className={style.map}>
          <LoadScript googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              center={{ lat: -32.217487, lng: -65.049124 }}
              zoom={15}
              mapContainerStyle={{ height: "400px" }}
            >
              <Marker position={{ lat: -32.217487, lng: -65.049124 }} onClick={handleMarkerClick} />
            </GoogleMap>
          </LoadScript>
        </div>
      </section>
    </main>
  );
}
