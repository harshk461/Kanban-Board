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
        "relative bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-md px-4 py-3 mb-2 cursor-grab transition-all",
        isDragging
          ? "opacity-70 border-2 border-green-400 ring-2 ring-green-200"
          : "hover:shadow-xl hover:border-green-200"
      )}
      data-column={column}
    >
      {/* Status dot */}
      <span
        className={clsx(
          "absolute left-3 top-3 w-2.5 h-2.5 rounded-full",
          column === "todo"
            ? "bg-indigo-400"
            : column === "in_progress"
            ? "bg-yellow-400"
            : "bg-green-400"
        )}
      />
      <div className="pl-6">
        <h3 className="font-semibold text-indigo-700 text-base mb-1 truncate">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-500 mb-1 line-clamp-2">{task.description}</p>
        )}
        {/* Example: Add more task meta info here */}
        {/* <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">#123</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Due: 2024-06-01</span>
        </div> */}
      </div>
    </div>
  );
}
