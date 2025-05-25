'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

export default function SortableItem({ id, task, column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'bg-white p-4 mb-2 rounded-xl shadow border cursor-grab',
        isDragging && 'opacity-50 border-blue-400 border-2'
      )}
      data-column={column}
    >
      <h3 className="font-semibold text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
}
