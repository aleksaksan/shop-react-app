import { useParams } from 'react-router-dom';
import { useTelegram } from '../../hooks/uaeTelegram';
import { Button } from '../Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
  const { user } = useTelegram();
  const { productsId } = useParams();

  return (
    <div className={styles.header}>
      <span className={styles.username}>
          hi, {user?.username}!
      </span>
      <nav className={styles.wrapper}>
        <div>
          <Button linkTo='catalog/edit'>Редактировать</Button>
          <Button linkTo={`${productsId}`}>Добавить товар</Button>
        </div>
        <div>
          <Button linkTo='/cart'>КОРЗИНА</Button>
          <Button linkTo='/catalog'>КАТАЛОГ</Button>
        </div>
      </nav>
    </div>
  );
};

