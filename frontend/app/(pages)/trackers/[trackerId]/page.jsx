'use client'

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosClient from "@/app/common/axiosConfig";
import toast from "react-hot-toast";
import { FaUserCircle, FaBuilding, FaPlus } from "react-icons/fa";
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Minimal SortableItem for demo
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function SortableItem({ id, task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`bg-white border border-indigo-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow mb-2 cursor-grab ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="text-sm font-medium text-indigo-700">{task.title}</div>
      {task.description && (
        <div className="mt-1 text-sm text-gray-600">{task.description}</div>
      )}
    </div>
  );
}

// Droppable column wrapper
function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className="flex flex-col gap-3 flex-1 min-h-[100px]">{children}</div>;
}

export default function TrackerKanbanPage() {
  const params = useParams();
  const router = useRouter();
  const trackerId = params?.trackerId;

  const [tracker, setTracker] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTaskCol, setAddTaskCol] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [client, setClient] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // WebSocket & STOMP setup for real-time sync
  useEffect(() => {
    if (!trackerId) return;
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/tracker`, (message) => {
        const updatedTask = JSON.parse(message.body);
        setTasks((prev) => {
          const exists = prev.find((t) => t.id === updatedTask.id);
          if (exists) {
            return prev.map((t) => (t.id === updatedTask.id ? updatedTask : t));
          }
          return [...prev, updatedTask];
        });
      });

      stompClient.subscribe(`/topic/tracker/${trackerId}/tasks`,(message)=>{
        const updatedTask = JSON.parse(message.body);
        console.log(updatedTask);
        setTasks((prev) => {
          const updatedTaskId = updatedTask.id;
          const updatedStatus = updatedTask.status;
          const updatedPosition = updatedTask.position;
          let otherTasks = prev.filter((t) => t.id !== updatedTaskId);
        
          let sameStatusTasks = otherTasks.filter((t) => t.status === updatedStatus);
        
          sameStatusTasks.splice(updatedPosition, 0, updatedTask);
        
          sameStatusTasks = sameStatusTasks.map((t, idx) => ({
            ...t,
            position: idx,
          }));
        
          const result = [
            ...otherTasks.filter((t) => t.status !== updatedStatus),
            ...sameStatusTasks,
          ];
        
          return result;
        });
        
      })

      stompClient.subscribe(`/topics/tasks/delete`, (message) => {
        const id = message.body;
        setTasks((prev) => prev.filter((t) => t.id !== id));
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [trackerId]);

  // Fetch tracker and tasks
  useEffect(() => {
    if (!trackerId) return;

    const fetchTracker = async () => {
      try {
        const res = await axiosClient.get(`/tracker/${trackerId}`);
        setTracker(res.data);
      } catch (err) {
        toast.error("Failed to load tracker");
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axiosClient.get(`/tasks/${trackerId}`);
        setTasks(res.data);
      } catch (err) {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracker();
    fetchTasks();
  }, [trackerId, router]);

  // Helper functions
  const getTasksByColumn = (col) =>
    tasks
      .filter((t) => t.status === col)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  const columns = tracker?.columns
    ? tracker.columns.split(",").map((col) => col.trim())
    : [];

  // Add new task to a column
  const handleAddTask = async (col) => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }
    try {
      await axiosClient.post(`/tasks/add-task/${trackerId}`, {
        name: newTaskTitle,
        description: newTaskDesc,
        status: col,
        position: tasks.filter((t) => t.status === col).length,
      });
      setNewTaskTitle("");
      setNewTaskDesc("");
      setAddTaskCol(null);
      toast.success("Task added!");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  // DnD logic for cross-column
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    // Find the source and destination column
    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // The over.id is the column id if dropped on column, or task id if dropped on another task
    let destColumn = over.id;
    let destIndex = 0;

    // If dropped on a task, get its column and index
    const overTask = tasks.find((t) => t.id === over.id);
    if (overTask) {
      destColumn = overTask.status;
      const destTasks = getTasksByColumn(destColumn);
      destIndex = destTasks.findIndex((t) => t.id === over.id);
    } else {
      // If dropped on column, put at end
      destIndex = getTasksByColumn(destColumn).length;
    }

    // If nothing changed, skip
    if (activeTask.status === destColumn && getTasksByColumn(destColumn)[destIndex]?.id === active.id) {
      return;
    }

    // Update locally
    let updatedTasks = [...tasks];
    // Remove from source
    updatedTasks = updatedTasks.filter((t) => t.id !== active.id);
    // Insert at destination
    const newTask = { ...activeTask, status: destColumn, position: destIndex };
    const destTasks = getTasksByColumn(destColumn);
    destTasks.splice(destIndex, 0, newTask);
    // Fix positions
    destTasks.forEach((t, idx) => t.position = idx);
    updatedTasks = [
      ...updatedTasks.filter((t) => t.status !== destColumn),
      ...destTasks
    ];
    setTasks(updatedTasks);

    // Update backend
    await axiosClient.put(`/tasks/${activeTask.id}`, {
      ...activeTask,
      status: destColumn,
      position: destIndex,
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (!tracker) return <h1>Tracker not found</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Tracker Info */}
        <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-8 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">{tracker.title}</h1>
          <p className="text-gray-600 mb-4">{tracker.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {columns.map((col, idx) => (
              <span
                key={idx}
                className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
              >
                {col}
              </span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-indigo-400" />
              <span>
                Created by:{" "}
                <span className="text-indigo-700 font-semibold">{tracker.createdBy?.name}</span>
                {tracker.createdBy?.email && (
                  <span className="ml-2 text-gray-400">&lt;{tracker.createdBy.email}&gt;</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding className="text-green-400" />
              <span>
                Org ID:{" "}
                <span className="text-green-700 font-semibold">{tracker.orgId}</span>
              </span>
            </div>
          </div>
        </section>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div
                key={col}
                className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-lg flex flex-col p-4 min-h-[350px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-indigo-700 capitalize">{col}</h2>
                  <button
                    onClick={() => setAddTaskCol(addTaskCol === col ? null : col)}
                    className="flex items-center gap-1 px-2 py-1 text-green-600 hover:bg-green-100 rounded-full transition"
                  >
                    <FaPlus /> <span className="text-sm">Add</span>
                  </button>
                </div>
                {/* Add Task Form */}
                {addTaskCol === col && (
                  <div className="mb-3 bg-green-50 rounded-xl p-3">
                    <input
                      type="text"
                      className="w-full mb-2 px-3 py-2 rounded border border-green-200 focus:ring-2 focus:ring-green-400 text-sm"
                      placeholder="Task title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <textarea
                      className="w-full mb-2 px-3 py-2 rounded border border-green-200 focus:ring-2 focus:ring-green-400 text-sm"
                      placeholder="Description (optional)"
                      value={newTaskDesc}
                      onChange={(e) => setNewTaskDesc(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddTask(col)}
                        className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-green-500 text-white rounded-full font-semibold text-sm"
                        type="button"
                      >
                        Add Task
                      </button>
                      <button
                        onClick={() => setAddTaskCol(null)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-semibold text-sm"
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {/* Tasks List */}
                <SortableContext
                  id={col}
                  items={getTasksByColumn(col).map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <DroppableColumn id={col}>
                    {getTasksByColumn(col).length === 0 ? (
                      <div className="text-gray-400 text-sm text-center mt-8">No tasks</div>
                    ) : (
                      getTasksByColumn(col).map((task) => (
                        <SortableItem
                          key={task.id}
                          id={task.id}
                          task={task}
                          column={col}
                        />
                      ))
                    )}
                  </DroppableColumn>
                </SortableContext>
              </div>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
