import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';

import { imagesCarrousel } from "../../assets/data";
import style from "./Carousel.module.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 4000,
        
      }}
    >
      {imagesCarrousel?.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.src} alt={`Slide${index}`} className={style.slideImg}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
