// src/components/TaskBoard.tsx
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskBoardCard from "./TaskBoardCard.tsx";


interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed" | "";
  category: "Work" | "Personal" | "";
  dueDate: Date | string | null;
  files?: string[];
  description?: string;
}

interface TaskBoardProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
  onClickTask: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDelete, onClickTask, onDragEnd }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const [isDroppableMounted, setIsDroppableMounted] = useState<Boolean>(false)
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

  useEffect(() => {
    setIsDroppableMounted(true)
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 font-mulish gap-5 mt-10 w-4/5 h-[71vh]">
        {isDroppableMounted && Object.entries(categorizedTasks).map(([status, tasks]) => (
          <Droppable type="group" key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div className="bg-gray-100 h-full p-4 rounded-2xl border-2 border-[#585751] border-opacity-[7%]">
                <div className={`${getSectionBgColor(status)} w-max px-3 py-1 rounded-md`}>
                  <h2 className="text-sm font-semibold capitalize">
                    {status.replace("-", " ")}
                  </h2>
                </div>

                {sections[status as "todo" | "in-progress" | "completed"] && (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mt-4 space-y-2"
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <TaskBoardCard
                            provided={provided}
                            onClick={onClickTask}
                            index={index}
                            task={task}
                            onDelete={onDelete}
                            snapshot={snapshot} />
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
