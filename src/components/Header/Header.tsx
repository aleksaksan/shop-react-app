import { Button } from '../Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      hello there!
      <Button linkTo='/cart'>В КОРЗИНУ</Button>
    </div>
  );
};

