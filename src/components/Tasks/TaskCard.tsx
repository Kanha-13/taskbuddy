// src/components/TaskCard.tsx
import React from "react";

interface TaskCardProps {
  title: string;
  category: string;
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, category, dueDate }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="text-sm text-gray-400">Due: {dueDate}</p>
    </div>
  );
};

export default TaskCard;
