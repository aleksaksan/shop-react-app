import { useCallback, useEffect, useState } from 'react';
import style from './CartPage.module.scss';
import { useAppSelector } from '../../hooks/storeHooks';
import { Item } from '../../store/catalogSlice';
import { Link } from 'react-router-dom';
import { useTelegram } from '../../hooks/uaeTelegram';
import { ItemsButtonsContainer } from '../../components/ItemCard/ItemsButtonsContainer';
import { baseUrl } from '../../consts/consts';

export const CartPage = () => {
  const { list } = useAppSelector(state => state.catalog);
  const [items, setItems ] = useState<Item[]>([]);
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = [...items];
    tg.sendData(JSON.stringify(data));
  }, [items, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    
    return () => {
        tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData, tg]);

  useEffect(() => {
    if (items.length) {
      tg.MainButton.setParams({
        text: 'Подтвердить'
      });
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
    return () => {
      tg.MainButton.hide();
    }
  }, [items.length, tg.MainButton]);


  useEffect(() => {
    const itemsToDisplay = list.filter((item) => item.quantity);
    setItems(itemsToDisplay);
    
  }, [list]);

  const cost = items.reduce((acc, item) => item.price * item.quantity + acc, 0)

  return (
    <div className={style.cart}>
      <div className={style.cart_wrapper}>
        {items.length ?
          items.map((item)=> (
          <div className={style.item} key={item.id}>
            <Link to={`/catalog/${item.id}`}><img src={`${baseUrl}${item.src}`} alt={item.title}/></Link>
            <div className={style.wrapper}>
              <Link to={`/catalog/${item.id}`}><h4>{item.title}</h4></Link>
              <div className="flex-between"><h5>Цена за шт:</h5><h5>{item.price} ₽</h5></div>
              <ItemsButtonsContainer itemId={item.id} /> 
            </div>
            <div className={style.price}>
              <h5>{item.quantity * item.price} ₽</h5>
            </div>
          </div>
        )) :
        <div className={style.empty}>
          <h4>Корзина пуста</h4>
        </div>
        }
      </div>
        <footer className={style.footer}>
          <div className="flex-between">
            <h4>Сумма</h4>
            <h4>{cost} ₽</h4>
          </div>
        </footer>
    </div>
  );
};

