import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight, FaWhatsapp, FaFacebook, FaLink, FaInstagram } from "react-icons/fa";
import { BsTelephone, BsMap } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import useComplex from "../../../hooks/useComplex";
import style from "./ComplexDetail.module.css";
import { Link } from "react-router-dom";
const { VITE_BACKEND_URL, VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ComplexDetail = () => {
  const complex = useComplex();

  const url = window.location.href;

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleMarkerClick = () => {
    if (complex?.lat && complex?.lng) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${complex.lat},${complex.lng}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = complex.images.indexOf(selectedImage.replace(VITE_BACKEND_URL, ""));
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? complex.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === complex.images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(VITE_BACKEND_URL + complex.images[newIndex]);
  };

  return (
    complex && (
      <div className={style.container}>
        <nav className={style.navTitles}>
          <Link to="/">Home</Link>
          <Link to="/alojamientos" className={style.beforeLink}>
            Alojamientos
          </Link>
          <span>{complex?.name}</span>
        </nav>
        <div className={style.contentComplex}>
          <div className={style.dataLeft}>
            <div className={style.images}>
              {complex?.images && complex.images.length > 0 && (
                <img
                  onClick={() => handleImageClick(VITE_BACKEND_URL + complex.images[0])}
                  src={VITE_BACKEND_URL + complex.images[0]}
                  alt={complex.name}
                />
              )}
              {complex?.images && complex.images.length > 1 && (
                <div className={style.imagesSmall}>
                {complex?.images.map(
                  (image, index) =>
                    index > 0 &&
                    index < 4 && (
                      <div key={index} className={style.imageContainer}>
                        <img
                          onClick={() => handleImageClick(VITE_BACKEND_URL + image)}
                          src={VITE_BACKEND_URL + image}
                          alt={complex.name + "image" + index}
                          className={index === 3 && complex.images.length > 4 ? style.imageWithOverlay : ''}
                        />
                        {index === 3 && complex.images.length > 4 && (
                          <div className={style.overlay}>+{complex.images.length - 4}</div>
                        )}
                      </div>
                    )
                )}
              </div>
              )}
              {complex?.images && complex.images.length > 1 && (
                <button onClick={() => handleImageClick(VITE_BACKEND_URL + complex.images[0])}>
                  Ver Galería de Fotos
                </button>
              )}
            </div>
            <div className={style.text}>
              <h1>{complex?.name}</h1>
              <p>{complex?.description}</p>
            </div>
            <div className={style.share}>
              <span>COMPARTIR</span>
              <div className={style.networks}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${complex?.name}: ${url}`)}`}
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
            <div className={style.map}>
              <LoadScript googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  center={{ lat: complex?.lat, lng: complex?.lng }}
                  zoom={15}
                  mapContainerStyle={{ height: "500px" }}
                >
                  <Marker position={{ lat: complex?.lat, lng: complex?.lng }} onClick={handleMarkerClick} />
                </GoogleMap>
              </LoadScript>
            </div>
            <div className={style.data}>
              <ul>
                <li>
                  <strong>
                    <BsMap />
                    Dirección:
                  </strong>{" "}
                  {complex?.address}
                </li>
                <li>
                  <strong>
                    <BsTelephone />
                    Tel/Whatsapp:
                  </strong>{" "}
                  {complex?.tel}
                </li>
                <li>
                  <strong>
                    <FaInstagram />
                    Instagram:
                  </strong>{" "}
                  {complex?.instagram}
                </li>
                <li>
                  <strong>
                    <MdOutlineMail />
                    E-mail:
                  </strong>{" "}
                  {complex?.email}
                </li>
                <li>
                  <strong>
                    <FaLink />
                    Web:
                  </strong>{" "}
                  {complex?.web}
                </li>
              </ul>
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
};

export default ComplexDetail;
