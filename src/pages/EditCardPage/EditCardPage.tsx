import { useEffect, useRef, useState } from 'react';
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
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';


type ItemEdit = Omit<ItemCardProps, 'quantity' | 'src'> & Record<'srcs', string[]> & Record<'fullDescription', string>;

export const EditCardPage = () => {
  const { id } = useParams();
  const [item] = useState<ItemEdit>();
  // const [item, setItem] = useState<ItemEdit>();
  const [description, setDescription] = useState(item?.description);
  const [fullDescription, setFullDescription] = useState(item?.fullDescription);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const images: Array<string> = [];
    
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }
  
      // setSelectedFiles(files);
      setImagePreviews(images);
    }
  }
  const filterFilesHandler = (src: string) => {
    setImagePreviews(imagePreviews.filter(item=>item !== src))
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

      
      <Preview srcs={imagePreviews}
        addHandler={handlePick}
        deleteHandler={filterFilesHandler}
        shakeHandler={() => {}}
      />
      

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

type PreviewType = {
  srcs?: string[],
  deleteHandler: (item: string) => void,
  addHandler: () => void,
  shakeHandler: () => void,
}

const Preview = (props: PreviewType) => {
  const [ items, setItems ] = useState<string[] | undefined>(props.srcs); 
  useEffect(() => {
    setItems(props.srcs);
  }, [props.srcs]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        if (items) {
          const oldIndex = items?.findIndex((item) => item === active.id);
          const newIndex = items?.findIndex((item) => item === over.id);
          
          return arrayMove(items, oldIndex, newIndex);
        }
      });
    }
  };

  return (
    <div className={style.container}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {items && 
        <SortableContext items={items}>

          {items.map(file=>
          <div className={style.preview} key={file}>
            <SortablePreviewItem src={file} deleteHandler={props.deleteHandler} />
          </div>
          )}
        </SortableContext>}
        <div className={`${style.add} ${style.preview}`} onClick={props.addHandler}>
          <div className={style.plus}></div>
        </div>

      </DndContext>
    </div>
  );
};

const SortablePreviewItem = (props: {src: string, deleteHandler: (item: string) => void}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({id: props.src});

  const styleItem = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1
  };

  return (
    <div ref={setNodeRef} style={styleItem} {...attributes} {...listeners}>
      <div className={style.preview} key={props.src}>
        <img src={props.src} alt='new photo' />
        <div className={style.cross} onClick={()=>props.deleteHandler(props.src)}/>
      </div>
    </div>
  )
}