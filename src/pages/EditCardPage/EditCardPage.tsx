import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import itemStyles from '../ProductPage/ProductPage.module.scss';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useParams } from 'react-router-dom';
import style from './EditCardPage.module.scss';
import { Button } from '../../components/Button/Button';
import { ItemCardProps } from '../../components/ItemCard/ItemCard';
import { Img } from '../../Svg/Img';
import { useForm } from 'react-hook-form';


type ItemEdit = Omit<ItemCardProps, 'quantity' | 'src'> & Record<'srcs', string[]> & Record<'fullDescription', string>;

export const EditCardPage = () => {
  const { id } = useParams();
  const [item] = useState<ItemEdit>();
  // const [item, setItem] = useState<ItemEdit>();
  const [description, setDescription] = useState(item?.description);
  const [fullDescription, setFullDescription] = useState(item?.fullDescription);
  // const [slides] = useState(slidesMock);
  const filePicker = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };


  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const descriptionTemp = {
      description,
      fullDescription
    }
    const dataToSend = {
      ...item,
      ...data,
      ...descriptionTemp,
      id
    }
    console.log(dataToSend);
  });

  const handleChange = () => {

  }

  return (
    <form className="main" onSubmit={onSubmit}>
      <>
        <input
          className={style.title} 
          type='text'
          value={item?.title}
          placeholder='Название товара'
          {...register('title', {required: true})}
        />
        <div className={itemStyles.wrapper}>
          <div className='flex-between'>
            <input
              className={style.weight}
              type='text'
              value={item?.weight}
              placeholder='Вес г'
              {...register('weight', {required: true})}
            />
            <input
              className={style.price}
              type='text'
              value={item?.price}
              placeholder='Цена  ₽'
              {...register('price', {required: true})}
            />
          </div>
          {item?.srcs.length ?
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
            { item?.srcs.map((img) => (
              <SwiperSlide key={img}>
                {<img src={img} alt={''}/>}
              </SwiperSlide>
            
            ))}
          </Swiper>: 
          <Img />
          }
        </div>

        <input className={style.hidden} type='file' multiple accept='image/*,.png,.jpg,.jpeg,.web' onChange={handleChange} ref={filePicker}/>
        <Button onClick={handlePick}>Выбрать фото</Button>
      </>
      <label className={style.description}>
        Краткое описание
      </label>
        <ReactQuill
          className={style.quill}
          theme="snow"
          value={description}
          onChange={setDescription}
          modules = {{
            toolbar: [
              ['bold', 'italic']
            ]}
          }
        />
      <label className={style.description}>
        Полное описание
      </label>
        <ReactQuill
          className={style.quill}
          theme="snow"
          value={fullDescription}
          onChange={setFullDescription}
          modules = {{
            toolbar: [
              ['bold', 'italic']
            ]}
          }
        />
        
      {!isValid && <span className={style.error}>Не все поля заполнены!</span>}
      <Button disabled={!isValid}>Сохранить</Button>
    </form>
  );
};
