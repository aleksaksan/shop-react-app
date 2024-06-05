import { useTelegram } from '../../hooks/uaeTelegram';
import { Button } from '../Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
  const { user } = useTelegram();

  return (
    <div className={styles.header}>
      <span className={styles.username}>
          hi, {user?.username}!
      </span>
      <Button linkTo='catalog/edit'>Редактировать</Button>
      <Button linkTo='/cart'>Добавить товар</Button>
      <Button linkTo='/cart'>КОРЗИНА</Button>
      <Button linkTo='/catalog'>КАТАЛОГ</Button>
    </div>
  );
};

