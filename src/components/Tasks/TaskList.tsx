import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddTaskRow from "./AddTaskRow.tsx";
import ListHead from "./ListHead.tsx";
import DropIcon from "../DropIcon.tsx";
import TaskListRow from "./TaskListRow.tsx";

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
  onClickTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDragEnd, onClickTask }) => {
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
        return "bg-todoDiv";
      case "in-progress":
        return "bg-inprogressDiv";
      case "completed":
        return "bg-completedDiv";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListHead />
      {Object.entries(categorizedTasks).map(([status, tasks]) => (
        <Droppable key={status} droppableId={status}>
          {(provided) => (
            <div
              className="mb-8 rounded-lg overflow-hidden"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                onClick={() =>
                  toggleSection(status as "todo" | "in-progress" | "completed")
                }
                className={`cursor-pointer ${getSectionBgColor(
                  status
                )} p-2 shadow-sm flex justify-between items-center`}
              >
                <h2 className="text-lg font-semibold capitalize">
                  {status.replace("-", " ")}
                </h2>
                <DropIcon isOpen={sections[status as "todo" | "in-progress" | "completed"]} />
              </div>
              {status === "todo" ? <AddTaskRow /> : null}
              {sections[status as "todo" | "in-progress" | "completed"] && (
                <div className="space-y-2 bg-boxGray">
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <TaskListRow
                          task={task}
                          index={index}
                          provided={provided}
                          snapshot={snapshot}
                          onClick={onClickTask}
                        />
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
