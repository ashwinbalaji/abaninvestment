"use client";

import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks } from '../services/taskService';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TaskForm onTaskCreated={loadTasks} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </main>
  );
}
