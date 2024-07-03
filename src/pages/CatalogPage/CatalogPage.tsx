import { useEffect } from 'react';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCatalog } from '../../store/catalogSlice';


export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, list, error } = useAppSelector(state => state.catalog);

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchCatalog());
    }
  }, [dispatch, list.length]);

  return (
    <div className="main">
      {isLoading && 'Loading...'}
      {error ?
        error :
        <div className='main'>
          {list.map(item => (
            <ItemCard
              id={item.id}
              title={item.title}
              description={item.description}
              src={item.src}
              weight={item.weight}
              price={item.price}
              key={item.id}
              quantity={item.quantity}
              />
          ))}
        </div>}
    </div>
  );
};
