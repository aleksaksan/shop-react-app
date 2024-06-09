import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Item, fetchCatalog } from '../../store/catalogSlice';
import { ItemCardProps, ItemToEdit } from '../../components/ItemCard/ItemCard';
import { CSS } from '@dnd-kit/utilities';

export const CatalogEditPage = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.catalog);
  const [ items, setItems ] = useState<Item[]>([]);
  // const { isLoading, list, error } = useAppSelector(state => state.catalog)

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  useEffect(() => {
    setItems(list);
  }, [list]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="main">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
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


const SortableItem = (props: ItemCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1
  };

  return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <ItemToEdit {...props}/>
      </div>
  )
}
