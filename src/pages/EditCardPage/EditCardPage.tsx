import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import itemStyles from '../ProductPage/ProductPage.module.scss';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { slidesMock } from '../ProductPage/ProductPage';
// import { useParams } from 'react-router-dom';
import style from './EditCardPage.module.scss';
import { Button } from '../../components/Button/Button';

export const EditCardPage = () => {
  const [value, setValue] = useState('');
  const [slides] = useState(slidesMock);
  // const { id } = useParams();

  return (
    <div className="main">
      <>
        <h1 className={itemStyles.title}>КАТУАБА</h1>
        <div className={itemStyles.wrapper}>
          <div className='flex-between'>
            <div className={itemStyles.weight}>50 г</div>
            <div className={itemStyles.price}>800 ₽</div>
          </div>
          <Swiper
            className={itemStyles.swiper}
            grabCursor={true}
            navigation={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id}>
                {<img src={item.src} alt={''}/>}
              </SwiperSlide>))}
          </Swiper>
        </div>
      </>
      <ReactQuill
        className={style.quill}
        theme="snow"
        value={value}
        onChange={setValue}
        modules = {{
          toolbar: [
            ['bold', 'italic']
          ]}
        }
      />

      <Button>Сохранить</Button>
    </div>
  );
};
