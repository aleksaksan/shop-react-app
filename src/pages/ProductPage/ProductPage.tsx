import { useEffect } from 'react';
import style from './ProductPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ItemsButtonsContainer } from '../../components/ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCard } from '../../store/cardSlice';


export const slidesMock = [
  {id: 1, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 2, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 3, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
  {id: 4, src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg'},
]

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, card, error } = useAppSelector(state => state.card);
  const { list } = useAppSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchCard(id));
  }, [dispatch, id]);
  
  return (
    <div className="main">
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
              {card?.srcs.map((img) => (
                <SwiperSlide key={img.id}>
                  {<img src={img.src} alt={img.id}/>}
                </SwiperSlide>))}
            </Swiper>
          </div>
          <div className={style.buttons}>
            <ItemsButtonsContainer itemId={id!.toString()} quantity={list.find(item => item?.id === id)?.quantity} />
          </div>

      
          <div className="description">

            <p className={style.bold}>
              измельчённая кора,{'\n'}бразильский можжевельник
            </p>
            <p>один из самых сильных растительных афродизиаков, быстродействующий антидепрессант, улучшатель памяти, улучшатель настроения, улучшатель либидо, сниматель стрессов</p>
            <p className={style.bold}>
              просто вкусный и необычный напиток
            </p>
            <p>чтобы выжать из катуабы максимум, нужно 5 гр. коры (столовая ложка) варить 10 минут на воде или на молоке, (на молоке получается намного ВКУСНЕЕ), после - процедить через сито</p>
          </div>
        </>
      }
    </div>
  );
};
