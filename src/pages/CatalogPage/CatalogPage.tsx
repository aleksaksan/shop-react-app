import { ItemCard } from '../../components/ItemCard/ItemCard';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {

  return (
    <div className={styles.catalog}>
      <ItemCard title='ОРЕХ КОЛА' description='целый' key={0} price={700} src='/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg' weight={20} />
      <ItemCard title='ОРЕХ КОЛА' description='целый' key={1} price={123700} src='/7cecfbda-35d1-48f8-9599-4a884bc158a3.jpg' weight={11160} />
    </div>
  );
};
