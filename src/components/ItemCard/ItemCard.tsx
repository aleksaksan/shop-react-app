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

  return (
    <div className={styles.card}>
      <ItemLink {...props}/>
      <ItemsButtonsContainer itemId={props.id} quantity={props.quantity}/>
    </div>
  );
};

const ItemInfo = (props: ItemCardProps) => {
  return (
    <>
      <div className={styles.image_wrapper}>
        <img src={props.src} alt={props.title} />
        <div className={styles.weight}>{props.weight} г</div>
        <div className={styles.price}>{props.price} ₽</div>
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </>
  )
};

export const ItemToEdit = (props: ItemCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <ItemInfo {...props}/>
        <Button linkTo={props.id}>Редактировать</Button>
      </div>
    </div>
  )
}

export const ItemLink = (props: ItemCardProps) => {

  return (
    <Link to={props.id} >
      <ItemInfo {...props} />
    </Link>
  )
};

export type ItemsButtonsContainerProps = {
  itemId: string,
  quantity?: number,
}

export const ItemsButtonsContainer = (props: ItemsButtonsContainerProps) => {
  const dispatch = useAppDispatch();

  const increment = (id: string) => {
    dispatch(add(id))
  };
  const decrement = (id: string) => {
    dispatch(remove(id))
  };

  return (
  <>
    { props.quantity ?
    <div className={styles.amount_container}>
      <Button onClick={() => decrement(props.itemId)}>-</Button>
      <div>{props.quantity}</div>
      <Button onClick={() => increment(props.itemId)}>+</Button>
    </div>
    :
    <Button onClick={() => increment(props.itemId)}>В КОРЗИНУ</Button>
    }
  </>
  )
};
