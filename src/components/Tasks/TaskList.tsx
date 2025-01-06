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
  checkRows: string[];
  onDragEnd: (result: any) => void;
  onClickTask: (id: string) => void;
  onRowCheck: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDragEnd, onClickTask, checkRows, onRowCheck }) => {
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

  const getArrowColor = (status: string) => {
    switch (status) {
      case "todo":
        return "text-[#3E0344]";
      case "in-progress":
        return "text-[#055167]";
      case "completed":
        return "text-[#0D7A0A]";
    }
    return ""
  };



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListHead />
      {Object.entries(categorizedTasks).map(([status, tasks]) => (
        <Droppable key={status} droppableId={status}>
          {(provided) => (
            <div
              className="mb-8 rounded-xl"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                onClick={() =>
                  toggleSection(status as "todo" | "in-progress" | "completed")
                }
                className={`cursor-pointer ${getSectionBgColor(
                  status
                )} p-2 px-4 shadow-sm flex justify-between items-center rounded-t-xl`}
              >
                <h2 className="text-lg font-semibold capitalize">
                  {status.replace("-", " ")} ({tasks.length})
                </h2>
                <DropIcon color={getArrowColor(status)} size="w-6 h-6 mr-3" isOpen={sections[status as "todo" | "in-progress" | "completed"]} />
              </div>
              {status === "todo" ? <AddTaskRow /> : null}
              {sections[status as "todo" | "in-progress" | "completed"] && (
                <div className="space-y-2 bg-boxGray rounded-b-xl">
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <TaskListRow
                          isChecked={checkRows.includes(task.id)}
                          task={task}
                          index={index}
                          provided={provided}
                          snapshot={snapshot}
                          onClick={onClickTask}
                          onRowCheck={onRowCheck}
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
