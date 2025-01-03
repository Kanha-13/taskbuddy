// src/components/TaskList.tsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
}

interface TaskListProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDragEnd }) => {
  const [sections, setSections] = useState({
    todo: true,
    "in-progress": true,
    completed: true,
  });

  const toggleSection = (section: "todo" | "in-progress" | "completed") => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categorizedTasks = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  const getSectionBgColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-todoDiv"; // Light red background
      case "in-progress":
        return "bg-inprogressDiv"; // Light blue background
      case "completed":
        return "bg-green-100"; // Light green background
      default:
        return "bg-completedDiv"; // Default background
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(categorizedTasks).map(([status, tasks]) => (
        <Droppable key={status} droppableId={status}>
          {(provided) => (
            <div className="mb-4">
              <div
                onClick={() => toggleSection(status as "todo" | "in-progress" | "completed")}
                className={`cursor-pointer ${getSectionBgColor(status)} p-2 rounded-md shadow-sm flex justify-between items-center`}
              >
                <h2 className="text-lg font-semibold capitalize">{status.replace("-", " ")}</h2>
                <span>{sections[status as "todo" | "in-progress" | "completed"] ? "▼" : "▶"}</span>
              </div>

              {sections[status as "todo" | "in-progress" | "completed"] && (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-2 space-y-2"
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white shadow-md p-4 rounded-lg"
                        >
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.category}</p>
                          <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default TaskList;
