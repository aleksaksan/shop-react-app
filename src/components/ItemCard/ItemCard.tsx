import React, { useState } from 'react';
import styles from './ItemCard.module.scss';
import { Button } from '../Button/Button';

export type ItemCardProps = {
  src?: string,
  weight?: number,
  price?: number,
  title: string,
  description?: string,
  // amount?: number,
};

export const ItemCard = (props: ItemCardProps) => {
  const [amount, setAmount] = useState(0);

  const increment = () => {
    setAmount(amount + 1)
  };
  const decrement = () => {
    setAmount(amount - 1)
  };

  return (
    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <img src={props.src} alt={props.title} />
        <div className={styles.weight}>{props.weight} г</div>
        <div className={styles.price}>{props.price} ₽</div>
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      { amount ?
      <div className={styles.amount_container}>
        <Button onClick={decrement}>-</Button>
        <div>{amount}</div>
        <Button onClick={increment}>+</Button>
      </div>
      :
      <Button onClick={increment}>В КОРЗИНУ</Button>
      }
    </div>
  );
};
