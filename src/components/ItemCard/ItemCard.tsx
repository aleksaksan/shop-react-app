import styles from './ItemCard.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { ItemsButtonsContainer } from './ItemsButtonsContainer';

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
      <ItemsButtonsContainer itemId={props.id} />
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
      {props.description && <p dangerouslySetInnerHTML={{__html: props.description}}></p>}
    </>
  )
};

export const ItemToEdit = (props: ItemCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <ItemInfo {...props}/>
        <Button linkTo={props.id.toString()}>Редактировать</Button>
      </div>
    </div>
  )
}

export const ItemLink = (props: ItemCardProps) => {

  return (
    <Link to={`${props.id}`} >
      <ItemInfo {...props} />
    </Link>
  )
};

