import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCatalog } from '../../store/catalogSlice';
import { ItemCard, ItemCardProps } from '../../components/ItemCard/ItemCard';

export const CatalogEditPage = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.catalog)
  const [items, setSetItems ] = useState(list);
  // const { isLoading, list, error } = useAppSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("Drag end called");
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if(active.id !== over.id) {
      setSetItems((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} >
        <SortableContext items={items} >
          {items.map(item =>
            <SortableItem 
              key={item.id} 
              id={item.id} 
              title={item.title} 
              description={item.description} 
              price={item.price} 
              src={item.src} 
              weight={item.weight}/>
            )}
        </SortableContext>
      </DndContext>
    </div>
  );
};


const SortableItem: FC<ItemCardProps> = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
    } = useSortable({id: props.id});

  // const style = {
  //     transform: CSS.Transform.toString(transform),
  //     transition
  // }

  return (
      <div ref={setNodeRef} {...attributes} {...listeners}>
          <ItemCard {...props}/>
      </div>
  )
}
