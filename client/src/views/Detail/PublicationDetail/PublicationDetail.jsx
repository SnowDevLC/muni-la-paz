import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { format as dateformat } from "date-fns";
import usePublication from "../../../hooks/usePublication";
import style from "./PublicationDetail.module.css";
const { VITE_BACKEND_URL } = import.meta.env;

export default function PublicationDetail() {
  const publication = usePublication();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = publication.images.indexOf(selectedImage.replace(VITE_BACKEND_URL, ""));
    let newIndex;
    if (direction === "left") {
      newIndex =
        currentIndex === 0 ? publication.images.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === publication.images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(VITE_BACKEND_URL + publication.images[newIndex]);
  };

  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        <FaCircleArrowLeft size={30} />
      </button>
      <div>
        <h1>{publication?.title}</h1>

        {/* se renderiza si hay imagenes */}
        <div className={style.images}>
          {publication?.images && publication.images.length > 0 && (
            <div className={style.imagesContainer}>
              <img
                onClick={() => handleImageClick(VITE_BACKEND_URL + publication.images[0])}
                src={VITE_BACKEND_URL + publication.images[0]}
                alt={publication.title}
              />
              <div className={style.imgDiv}>
                {publication.images.map(
                  (image, index) =>
                    index !== 0 && (
                      <img
                        key={index}
                        src={VITE_BACKEND_URL + image}
                        alt={`Image ${index + 1}`}
                        onClick={() => handleImageClick(VITE_BACKEND_URL + image)}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>
        <p>Descripcion: {publication?.description}</p>
        <span>
          Fecha:{" "}
          {publication ? dateformat(publication.date, "PP") : "Sin fecha"}
        </span>
        <p> {publication?.type}</p>
        <div style={{ textAlign: "center" }}>
          <a href="/pdf" target="_blank">
            <button>Ir a PDF</button>
          </a>
        </div>
      </div>
      {showPopup && (
        <div className={style.popup}>
          <div className={style.popupImageContainer}>
            <button
              className={`${style.carouselControl} ${style.carouselControlLeft}`}
              onClick={() => handleArrowClick("left")}
            >
              <FaArrowCircleLeft />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Popup"
                className={style.popupImage}
              />
            )}
            <button
              className={`${style.carouselControl} ${style.carouselControlRight}`}
              onClick={() => handleArrowClick("right")}
            >
              <FaArrowCircleRight />
            </button>
            <button className={style.closeButton} onClick={handlePopupClose}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
