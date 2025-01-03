// src/components/TaskDetails.tsx
import React from "react";

interface Task {
  title: string;
  category: string;
  dueDate: string;
  files: string[];
}

const TaskDetails: React.FC<{ task: Task }> = ({ task }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-bold">{task.title}</h3>
    <p>Category: {task.category}</p>
    <p>Due Date: {task.dueDate}</p>
    <h4 className="font-semibold mt-4">Attached Files:</h4>
    <ul className="list-disc pl-6">
      {task.files.map((file, idx) => (
        <li key={idx}>
          <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskDetails;
