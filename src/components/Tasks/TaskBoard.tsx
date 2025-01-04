// src/components/TaskBoard.tsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskBoardCard from "./TaskBoardCard.tsx";


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
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const [sections, setSections] = useState({
    todo: true,
    "in-progress": true,
    completed: true,
  });

  const categorizedTasks = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  const getSectionBgColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-todoDiv";
      case "in-progress":
        return "bg-inprogressDiv";
      case "completed":
        return "bg-boardcompletedDiv";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 font-mulish gap-4">
        {Object.entries(categorizedTasks).map(([status, tasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div className="bg-gray-100 p-4 rounded-lg border-2 border-[#585751] border-opacity-[7%]">
                <div className={`${getSectionBgColor(status)} w-max px-3 py-1 rounded-md`}>
                  <h2 className="text-lg font-semibold capitalize">
                    {status.replace("-", " ")}
                  </h2>
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
                          <TaskBoardCard provided={provided} index={index} task={task} snapshot={snapshot} />
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
    </DragDropContext >
  );
};

export default TaskBoard;
