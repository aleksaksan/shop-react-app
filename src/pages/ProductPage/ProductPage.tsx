import React, { useState } from 'react';
import style from './ProductPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


const slidesMock = [
  {id: 1, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 2, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 3, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 4, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
]

export const ProductPage = () => {
  const [slides] = useState(slidesMock);


  return (
    <>
      <h1 className={style.title}>КАТУАБА</h1>
      <Swiper
        grabCursor={true}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            {<img src={item.src} alt={''}/>}
          </SwiperSlide>))}
      </Swiper>
    </>
  );
};
