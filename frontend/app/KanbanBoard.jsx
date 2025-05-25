'use client';

import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

const columns = ['todo', 'in_progress', 'done'];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [client, setClient] = useState(null);

  // Fetch tasks initially
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:8080/api/tasks');
    setTasks(res.data);
  };

  // WebSocket & STOMP setup for real-time sync
  useEffect(() => {
    fetchTasks();

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/tasks', (message) => {
        const updatedTask = JSON.parse(message.body);
        setTasks((prev) => {
          const existing = prev.find((t) => t.id === updatedTask.id);
          if (existing) {
            return prev.map((t) => (t.id === updatedTask.id ? updatedTask : t));
          }
          return [...prev, updatedTask];
        });
      });

      stompClient.subscribe('/topic/tasks/delete', (message) => {
        const id = Number(message.body);
        setTasks((prev) => prev.filter((t) => t.id !== id));
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Helper: get tasks filtered and sorted by position in a column
  const getTasksByColumn = (column) =>
    tasks
      .filter((t) => t.status === column)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  // Handle drag end event to update position and status
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === Number(active.id));
    if (!activeTask) return;

    // Find source and destination columns
    const sourceColumn = activeTask.status;
    // Get destination column from data attribute of dropped item container
    const overTask = tasks.find((t) => t.id === Number(over.id));
    const destColumn = overTask ? overTask.status : sourceColumn;

    if (!destColumn) return;

    // Get sorted tasks in source and destination columns
    const sourceTasks = getTasksByColumn(sourceColumn);
    const destTasks = getTasksByColumn(destColumn);

    if (sourceColumn === destColumn) {
      // Reordering inside the same column
      const oldIndex = sourceTasks.findIndex((t) => t.id === activeTask.id);
      const newIndex = sourceTasks.findIndex((t) => t.id === Number(over.id));

      const newOrder = arrayMove(sourceTasks, oldIndex, newIndex);

      // Update positions locally & backend
      const updatedTasks = tasks.map((task) => {
        const found = newOrder.findIndex((t) => t.id === task.id);
        if (found !== -1) {
          const updated = { ...task, position: found };
          if (task.id === activeTask.id) return updated;
          return updated;
        }
        return task;
      });

      setTasks(updatedTasks);

      // Send batch update or individual update (here we update active task for demo)
      await axios.put(`http://localhost:8080/api/tasks/${activeTask.id}`, {
        ...activeTask,
        position: newOrder.findIndex((t) => t.id === activeTask.id),
      });
    } else {
      // Moving task to different column, put at end of destination column
      const newPosition = destTasks.length;

      const updatedTask = { ...activeTask, status: destColumn, position: newPosition };

      // Optimistic UI update
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? updatedTask : t))
      );

      await axios.put(`http://localhost:8080/api/tasks/${activeTask.id}`, updatedTask);
    }
  };

  // Add a new task to the bottom of a column
  const addTask = async (column) => {
    const columnTasks = getTasksByColumn(column);
    const newTask = {
      title: 'New Task',
      description: '',
      status: column,
      position: columnTasks.length,
    };

    try {
      const res = await axios.post('http://localhost:8080/api/tasks', newTask);
      // Backend broadcasts via websocket, but update state just in case:
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-4 gap-4 p-6">
        {columns.map((column) => {
          const tasksInColumn = getTasksByColumn(column);
          return (
            <div key={column} className="bg-gray-100 rounded-xl p-4 shadow-md flex flex-col">
              <h2 className="text-xl font-bold capitalize mb-2">{column.replace('_', ' ')}</h2>
  
              <SortableContext
                items={tasksInColumn.map((t) => t.id.toString())}
                strategy={verticalListSortingStrategy}
              >
                {tasksInColumn.map((task) => (
                  <SortableItem
                    key={task.id}
                    id={task.id.toString()}
                    task={task}
                    column={column}
                  />
                ))}
              </SortableContext>
  
              <button
                onClick={() => addTask(column)}
                className="mt-auto py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                + Add Task
              </button>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
  
}
