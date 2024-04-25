import { useEffect } from 'react';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import styles from './CatalogPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCatalog } from '../../store/catalogSlice';

// const catalogMock: ItemCardProps[] = [
//   { id: '0', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '1', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '2', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '3', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '4', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '5', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '6', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
//   { id: '7', title: 'ОРЕХ КОЛА', description: 'целый', src: '/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg', weight: '20', price: 700},
// ];



export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, list, error } = useAppSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  return (
    <>
      {isLoading && 'Loading...'}
      {error ?
        error :
        <div className={styles.catalog}>
          {list.map(item => (
            <ItemCard id={item.id} title={item.title} description={item.description} src={item.src} weight={item.weight} price={item.price} key={item.id} />
          ))}
        </div>}
    </>
  );
};
