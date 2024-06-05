import { useTelegram } from '../../hooks/uaeTelegram';
import { Button } from '../Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
  const { user } = useTelegram();

  return (
    <div className={styles.header}>
      <span className={styles.username}>
          {user?.username}
      </span>
      <Button linkTo='/cart'>КОРЗИНА</Button>
      <Button linkTo='/catalog'>КАТАЛОГ</Button>
    </div>
  );
};

