import { useState } from "react";
import type { DragEvent } from "react";

type ItemId = number | string;

type UseDraggableListParams<T> = {
  items: T[];
  getId: (item: T, index: number) => ItemId;
  onReorder: (items: T[]) => void;
};

const reorderItems = <T,>(
  items: T[],
  fromIndex: number,
  toIndex: number,
): T[] => {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);

  nextItems.splice(toIndex, 0, movedItem);

  return nextItems;
};

export const useDraggableList = <T,>({
  items,
  getId,
  onReorder,
}: UseDraggableListParams<T>) => {
  const [draggedId, setDraggedId] = useState<ItemId | null>(null);
  const getItemId = (targetItem: T) => {
    const targetIndex = items.indexOf(targetItem);

    return getId(targetItem, targetIndex);
  };

  const getItemProps = (targetItem: T) => ({
    onDragOver: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    onDrop: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();

      if (draggedId === null) {
        return;
      }

      const targetId = getItemId(targetItem);
      const fromIndex = items.findIndex(
        (item, index) => getId(item, index) === draggedId,
      );
      const toIndex = items.findIndex(
        (item, index) => getId(item, index) === targetId,
      );

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        setDraggedId(null);
        return;
      }

      onReorder(reorderItems(items, fromIndex, toIndex));
      setDraggedId(null);
    },
  });

  const getHandleProps = (item: T) => ({
    draggable: true,
    onDragStart: (event: DragEvent<HTMLElement>) => {
      const itemId = getItemId(item);

      setDraggedId(itemId);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(itemId));
    },
    onDragEnd: () => {
      setDraggedId(null);
    },
  });

  const isDragging = (item: T) => draggedId === getItemId(item);

  return {
    getHandleProps,
    getItemProps,
    isDragging,
  };
};
