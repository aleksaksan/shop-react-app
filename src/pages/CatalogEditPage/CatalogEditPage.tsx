import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchCatalog } from '../../store/catalogSlice';
import { ItemCard, ItemCardProps } from '../../components/ItemCard/ItemCard';

export const CatalogEditPage = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.catalog)
  // const { isLoading, list, error } = useAppSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  return (
    <div>
      <DndContext onDragEnd={()=>{}} >
        <SortableContext items={list} >
          {list.map(item =>
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