"use client";

import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

const TaskList = ({ tasks, onDelete }: { tasks: Task[]; onDelete: (id: number) => void }) => {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>No tasks available</td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TaskList;
