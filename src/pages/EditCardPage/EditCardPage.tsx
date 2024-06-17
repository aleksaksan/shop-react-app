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
import { FieldValues, useForm } from 'react-hook-form';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import axios from 'axios';


type ItemEdit = Omit<ItemCardProps, 'quantity' | 'src'> & Record<'fullDescription', string>;

type selectedFileType = { 
  id: string,
  file: File,
  url: string
};


export const EditCardPage = () => {
  const { id } = useParams();
  const [item] = useState<ItemEdit>();
  // const [item, setItem] = useState<ItemEdit>();
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<selectedFileType[]>([]);
  const filePicker = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const baseURL = 'http://localhost:8000'

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  useEffect(() => {
    if (!description  || !fullDescription || description === "<p><br></p>" || fullDescription === "<p><br></p>") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [description, fullDescription, isEmpty]);

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    

    const dataToSend: FieldValues = {
      ...data,
      description: description,
      fullDescription: fullDescription,
      id
    };
       
    try {
      if (selectedFiles) {
        const formData = new FormData();
        for (const fileObj of selectedFiles) {
          formData.append('files', fileObj.file);
        }
        for (const key in dataToSend) {
          if (key && dataToSend[key])
          formData.append(key, dataToSend[key])
        }
        
        const answ = await axios.post(`${baseURL}/api/card/add`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
        console.log(answ.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files) {

      for (let i = 0; i < files.length; i++) {
        const newItem: selectedFileType = {
          id: URL.createObjectURL(files[i]),
          file: files[i],
          url: URL.createObjectURL(files[i])
        }
        setSelectedFiles(prev => [...prev, newItem]);
      }
    }
  };

  const filterFilesHandler = (id: string) => {
    setSelectedFiles(selectedFiles.filter(item => item.id !== id));
  };
  const shakeHandler = (files: selectedFileType[]) => {
    setSelectedFiles(files);
  };

  return (
    <form className="main w-44" onSubmit={onSubmit}>
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
          {selectedFiles.length ?
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
            { selectedFiles.map((img) => (
              <SwiperSlide key={img.id}>
                {<img src={img.url} alt={'new photo'}/>}
              </SwiperSlide>
            
            ))}
          </Swiper>: 
          <Img />
          }
        </div>

        <input className={style.hidden} type='file' multiple accept='image/*,.png,.jpg,.jpeg,.web' onChange={handleChange} ref={filePicker}/>
      </>

      
      <Preview 
        srcs={selectedFiles}
        addHandler={handlePick}
        deleteHandler={filterFilesHandler}
        shakeHandler={shakeHandler}
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
        
      {(!isValid || isEmpty) && <span className={style.error}>Не все поля заполнены!</span>}
      <Button disabled={!isValid || isEmpty}>Сохранить</Button>
    </form>
  );
};

type PreviewType = {
  srcs?: selectedFileType[],
  deleteHandler: (item: string) => void,
  addHandler: () => void,
  shakeHandler: (imgUrls: selectedFileType[]) => void,
}

const Preview = (props: PreviewType) => {
  const [ items, setItems ] = useState<selectedFileType[] | undefined>(props.srcs); 

  useEffect(() => {
    setItems(props.srcs);
  }, [props]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        if (items) {
          const oldIndex = items?.findIndex((item) => item.id === active.id);
          const newIndex = items?.findIndex((item) => item.id === over.id);
          
          return arrayMove(items, oldIndex, newIndex);
        }
      });
    }
    if (items) {
      props.shakeHandler(items);
    }
  };

  return (
    <div className={style.container}>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        {items && 
        <SortableContext items={items}>

          {items.map(file=>
            <SortablePreviewItem  key={file.id} src={file} deleteHandler={props.deleteHandler} />
          )}
        </SortableContext>}
        <div className={`${style.add} ${style.preview}`} onClick={props.addHandler}>
          <div className={style.plus}></div>
        </div>

      </DndContext>
    </div>
  );
};

const SortablePreviewItem = (props: {src: selectedFileType, deleteHandler: (id: string) => void}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({id: props.src.id});

  const styleItem = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1
  };

  return (
    <div ref={setNodeRef} style={styleItem} {...attributes} {...listeners}>
      <div className={style.preview} key={props.src.id}>
        <img src={props.src.url} alt='new photo' />
        <div className={style.cross} onClick={()=>props.deleteHandler(props.src.id)}/>
      </div>
    </div>
  )
}