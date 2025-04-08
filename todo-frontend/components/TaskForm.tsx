"use client";

import React, { useState } from 'react';

const TaskForm = ({ onTaskCreated }: { onTaskCreated: () => void }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      // Notify parent and reset form
      onTaskCreated();
      setTaskTitle("");
      setTaskDescription("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>
      <div>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description"
          required
        />
      </div>
      <button type="submit">Add Task</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default TaskForm;
