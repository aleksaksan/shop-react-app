import React, { useState } from 'react';
import style from './ProductPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ItemsButtonsContainer } from '../../components/ItemCard/ItemCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import { Button } from '../../components/Button/Button';


const slidesMock = [
  {id: 1, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 2, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 3, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 4, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
]

export const ProductPage = () => {
  const [slides] = useState(slidesMock);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { list } = useAppSelector(state => state.catalog);
  // const { isLoading, list, error } = useAppSelector(state => state.catalog);
  const item = list.find((item) => item.id === id!.toString());
  

  return (
    <div className="main">
      <Button onClick={()=>navigate(-1)} >To Catalog</Button>
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
      <ItemsButtonsContainer itemId={id!.toString()} quantity={item?.quantity} />
    </div>
  );
};
