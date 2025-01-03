// src/components/TaskBoard.tsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
}

interface TaskBoardProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDragEnd }) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(categorizedTasks).map(([status, tasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div
                  onClick={() => toggleSection(status as "todo" | "in-progress" | "completed")}
                  className="cursor-pointer bg-gray-200 p-2 rounded-md shadow-sm flex justify-between items-center"
                >
                  <h2 className="text-lg font-semibold capitalize">
                    {status.replace("-", " ")}
                  </h2>
                  <span>
                    {sections[status as "todo" | "in-progress" | "completed"]
                      ? "▼"
                      : "▶"}
                  </span>
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
                            className="bg-white p-4 rounded-lg shadow-md"
                          >
                            <h3 className="text-md font-bold">{task.title}</h3>
                            <p className="text-sm text-gray-500">{task.dueDate}</p>
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
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
