import React from 'react';
import styles from './ItemCard.module.scss';
import { Button } from '../Button/Button';

export type ItemCardProps = {
  src?: string,
  weight?: number,
  price?: number,
  title: string,
  description?: string,
  amount?: number,
};

export const ItemCard = (props: ItemCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <img src={props.src} alt={props.title} />
        <div className={styles.weight}>{props.weight} г</div>
        <div className={styles.price}>{props.price} ₽</div>
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      { !props.amount ?
      <div className={styles.amount_container}>
        <Button>-</Button>
        <div>1</div>
        {/* <div>{props.amount}</div> */}
        <Button>+</Button>
      </div>
      :
      <Button>В КОРЗИНУ</Button>
      }
    </div>
  );
};
