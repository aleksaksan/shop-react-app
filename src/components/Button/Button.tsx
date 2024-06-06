import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

export type ButtonProps = {
  linkTo?: string,
  onClick?: () => void,
  children: string,
  disabled?: boolean,
};

export const Button = (props: ButtonProps) => {
  return (
    props.linkTo ?
      <Link to={props.linkTo} className={styles.button}>{props.children}</Link>
    :
      <button onClick={props.onClick} className={styles.button} disabled={props.disabled}>
        {props.children}
      </button>
  );
};
