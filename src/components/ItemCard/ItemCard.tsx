import styles from './ItemCard.module.scss';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../hooks/storeHooks';
import { add, remove } from '../../store/catalogSlice';
import { Link } from 'react-router-dom';

export type ItemCardProps = {
  id: string,
  src?: string,
  weight?: string | number,
  price?: number,
  title: string,
  description?: string,
  quantity?: number,
};

export const ItemCard = (props: ItemCardProps) => {
  const dispatch = useAppDispatch();

  const increment = (id: string) => {
    dispatch(add(id))
  };
  const decrement = (id: string) => {
    dispatch(remove(id))
  };

  return (
    <div className={styles.card}>
      <ItemLink {...props}/>
      { props.quantity ?
      <div className={styles.amount_container}>
        <Button onClick={() => decrement(props.id)}>-</Button>
        <div>{props.quantity}</div>
        <Button onClick={() => increment(props.id)}>+</Button>
      </div>
      :
      <Button onClick={() => increment(props.id)}>В КОРЗИНУ</Button>
      }
    </div>
  );
};

export const ItemLink = (props: ItemCardProps) => {

  return (
    <Link to={props.id} >
      <div className={styles.image_wrapper}>
        <img src={props.src} alt={props.title} />
        <div className={styles.weight}>{props.weight} г</div>
        <div className={styles.price}>{props.price} ₽</div>
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </Link>
  )
}