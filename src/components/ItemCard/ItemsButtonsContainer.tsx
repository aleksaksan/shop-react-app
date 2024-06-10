import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { add, remove } from "../../store/catalogSlice";
import { Button } from "../Button/Button";
import styles from "./ItemCard.module.scss";

export type ItemsButtonsContainerProps = {
  itemId: string,
}

export const ItemsButtonsContainer = (props: ItemsButtonsContainerProps) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.catalog);
  const quantity = list.find(item => item?.id == props.itemId)?.quantity
  

  const increment = (id: string) => {
    dispatch(add(id))
  };
  const decrement = (id: string) => {
    dispatch(remove(id))
  };

  return (
  <>
    { quantity ?
    <div className={styles.amount_container}>
      <Button onClick={() => decrement(props.itemId)}>-</Button>
      <div>{quantity}</div>
      <Button onClick={() => increment(props.itemId)}>+</Button>
    </div>
    :
    <Button onClick={() => increment(props.itemId)}>В КОРЗИНУ</Button>
    }
  </>
  )
};
