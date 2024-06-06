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
      <nav className={styles.wrapper}>
        <div>
          <Button linkTo='/cart'>КОРЗИНА</Button>
          <Button linkTo='/catalog'>КАТАЛОГ</Button>
        </div>
        <div>
          <Button linkTo='catalog/edit'>Редактировать</Button>
          <Button linkTo='/cart'>Добавить товар</Button>
        </div>
      </nav>
    </div>
  );
};

