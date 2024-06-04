import { useEffect, useState } from 'react';
import style from './CartPage.module.scss';
import { useAppSelector } from '../../hooks/storeHooks';
import { Item } from '../../store/catalogSlice';
import { Link } from 'react-router-dom';
import { ItemsButtonsContainer } from '../../components/ItemCard/ItemCard';
import { Button } from '../../components/Button/Button';

export const CartPage = () => {
  const { list } = useAppSelector(state => state.catalog);
  const [items, setItems ] = useState<Item[]>([]);

  useEffect(() => {
    const itemsToDisplay = list.filter((item) => item.quantity);
    setItems(itemsToDisplay);
  }, [list]);

  const cost = items.reduce((acc, item) => item.price * item.quantity + acc, 0)

  return (
    <>
      <div className="main">
        <div className={style.cart}>
          {items.length ?
            items.map((item)=> (
            <div className={style.item} key={item.id}>
              <Link to={item.id}><img src={item.src} alt={item.title}/></Link>
              <div className={style.wrapper}>
                <Link to={item.id}><h4>{item.title}</h4></Link>
                <div className="flex-between"><h5>Цена за шт:</h5><h5>{item.price}</h5></div>
                <ItemsButtonsContainer itemId={item.id} quantity={item.quantity}/> 
              </div>
              <div className={style.price}>
                <h5>{item.quantity * item.price}</h5>
              </div>
            </div>
          )) :
          <div className={style.empty}>
            <h4>Корзина пуста</h4>
            <Button linkTo='/catalog'>Перейти в каталог</Button>
          </div>
          }
        </div>
      </div>
      <footer className={style.footer}>
        <div className="flex-between">
          <h4>Сумма</h4>
          <h4>{cost}</h4>
        </div>
        <Button onClick={()=>{}}>Сделать заказ</Button>
      </footer>
    </>
  );
};

