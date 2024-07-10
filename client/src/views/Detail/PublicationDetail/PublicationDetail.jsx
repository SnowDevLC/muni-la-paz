import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });
import usePublication from "../../../hooks/usePublication";
import style from "./PublicationDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Publication } from "../../../components";
const { VITE_BACKEND_URL } = import.meta.env;

export default function PublicationDetail() {
  const publication = usePublication();

  const url = window.location.href;

  const allPublications = useSelector((state) => state.publications);

  const publications = allPublications.filter((publication) => publication.check).slice(0, 3);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = publication.images.indexOf(selectedImage.replace(VITE_BACKEND_URL, ""));
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? publication.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === publication.images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(VITE_BACKEND_URL + publication.images[newIndex]);
  };

  const openPdf = (pdf) => {
    window.open(pdf, "_blank");
  };

  return (
    publication && (
      <div className={style.container}>
        <nav className={style.navTitles}>
          <Link to="/">Home</Link>
          <Link to="/noticias" className={style.beforeLink}>
            Noticias
          </Link>
          <span>{publication.title}</span>
        </nav>
        <div className={style.contentComplex}>
          <div className={style.dataLeft}>
            {publication.type === "Concejo" ? (
              <div className={style.pdfContainer}>
                <embed src={VITE_BACKEND_URL + publication.images[0]} type="application/pdf" className={style.pdf} />
                <button onClick={() => openPdf(VITE_BACKEND_URL + publication.images[0])}>Ver PDF</button>
              </div>
            ) : (
              <div className={style.images}>
                {publication?.images && publication.images.length > 0 && (
                  <img
                    onClick={() => handleImageClick(VITE_BACKEND_URL + publication.images[0])}
                    src={VITE_BACKEND_URL + publication.images[0]}
                    alt={publication.title + "image"}
                  />
                )}
                {publication?.images && publication.images.length > 1 && (
                  <div className={style.imagesSmall}>
                    {publication?.images.map(
                      (image, index) =>
                        index > 0 &&
                        index < 4 && (
                          <div key={index} className={style.imageContainer}>
                            <img
                              onClick={() => handleImageClick(VITE_BACKEND_URL + image)}
                              src={VITE_BACKEND_URL + image}
                              alt={publication.title + "image" + index}
                              className={index === 3 && publication.images.length > 4 ? style.imageWithOverlay : ""}
                            />
                            {index === 3 && publication.images.length > 4 && (
                              <div className={style.overlay}>+{publication.images.length - 4}</div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                )}
                {publication?.images && publication.images.length > 1 && (
                  <button onClick={() => handleImageClick(VITE_BACKEND_URL + publication.images[0])}>
                    Ver Galería de Fotos
                  </button>
                )}
              </div>
            )}
            <div className={style.text}>
              <div className={style.dates}>
                <small>Publicado: {format(publication.date, "PPPP")}</small>
                {publication.isEvent && (
                  <small className={style.eventDate}>Evento: {format(publication.eventDate, "PPPP")}</small>
                )}
              </div>
              <h1>{publication?.title}</h1>
              {publication?.video && publication.video !== "" && (
                <div className={style.video}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={publication.video.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
              <p>{publication?.description}</p>
            </div>
            <div className={style.share}>
              <span>COMPARTIR</span>
              <div className={style.networks}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${publication?.title}: ${url}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className={style.icon} />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className={style.icon} />
                </a>
              </div>
            </div>
          </div>

          <div className={style.dataRight}>
            <div className={style.lastNotices}>
              <div className={style.title}>
                <h2>
                  Últimas<br></br>
                  <span className={style.span}>Noticias</span>
                </h2>
              </div>
              <div className={style.gridLastNotices}>
                {publications?.map(
                  (publi, index) => publi.id !== publication.id && <Publication key={index} publication={publi} />
                )}
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className={style.popup}>
            <div className={style.popupImageContainer}>
              <button
                className={`${style.carouselControl} ${style.carouselControlLeft}`}
                onClick={() => handleArrowClick("left")}
              >
                <FaArrowCircleLeft className={style.icon} />
              </button>
              {selectedImage && <img src={selectedImage} alt="Popup" className={style.popupImage} />}
              <button
                className={`${style.carouselControl} ${style.carouselControlRight}`}
                onClick={() => handleArrowClick("right")}
              >
                <FaArrowCircleRight className={style.icon} />
              </button>
              <button className={style.closeButton} onClick={handlePopupClose}>
                CERRAR
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
