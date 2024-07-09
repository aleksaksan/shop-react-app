import { useEffect } from 'react';
import style from './ProductPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCard } from '../../store/cardSlice';
import { ItemsButtonsContainer } from '../../components/ItemCard/ItemsButtonsContainer';
import { baseUrl } from '../../consts/consts';

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, card, error } = useAppSelector(state => state.card);

  useEffect(() => {
    dispatch(fetchCard(id));
  }, [dispatch, id]);
  
  return (
    <div className="main w-44">
      {isLoading && 'Loading...'}
      {error ?
        error :
        <>
          <h1 className={style.title}>{card?.title}</h1>
          <div className={style.wrapper}>
            <div className='flex-between'>
              <div className={style.weight}>{card?.weight} г</div>
              <div className={style.price}>{card?.price} ₽</div>
            </div>
            <Swiper
              className={style.swiper}
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
              {card?.images.map((img) => (
                <SwiperSlide key={img.id}>
                  {<img src={`${baseUrl}${img.name}`} alt={img.name}/>}
                </SwiperSlide>))}
            </Swiper>
          </div>
          <div className={style.buttons}>
            {id && <ItemsButtonsContainer itemId={id} />}
          </div>
          
          <div className="description">
            {card?.description && <p dangerouslySetInnerHTML={{__html: card?.description}}></p>}
          </div>
          <div className="description">
            {card?.full_description && <p dangerouslySetInnerHTML={{__html: card?.full_description.fullDescription}}></p>}
          </div>
          
        </>
      }
    </div>
  );
};
