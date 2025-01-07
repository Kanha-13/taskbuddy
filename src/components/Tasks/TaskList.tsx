import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTaskRow from "./AddTaskRow.tsx";
import ListHead from "./ListHead.tsx";
import DropIcon from "../DropIcon.tsx";
import TaskListRow from "./TaskListRow.tsx";
import NoSearchResult from "../NoSearchResult.tsx";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed" | "";
  category: "Work" | "Personal" | "";
  dueDate: Date | string | null;
  files?: string[];
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
  checkRows: string[];
  onDragEnd: (result: any) => void;
  onClickTask: (id: string) => void;
  onRowCheck: (id: string) => void;
  onChangeStatus: (id: string, status: "todo" | "in-progress" | "completed" | "") => void;
  onDelete: (id: string) => void;
  onCreateNewTask: (task: Task) => void;
  isSearching: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onChangeStatus, onDelete, onDragEnd, onClickTask, checkRows, onRowCheck, onCreateNewTask, isSearching }) => {
  const [isDroppableMounted, setMountDroppable] = useState<boolean>(false);
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

  useEffect(() => {
    setMountDroppable(true)
  }, [])


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="border-t-2 border-opacity-10 border-black mt-8">
        {isSearching && tasks.length < 1 ? <NoSearchResult /> :
          <>
            <ListHead />
            {isDroppableMounted && Object.entries(categorizedTasks).map(([status, tasks]) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    className={`mb-8 rounded-xl border-2 border-[#EAECF0] ${sections[status as "todo" | "in-progress" | "completed"] ? "" : "overflow-hidden"}`}
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
                    {status === "todo" ? <AddTaskRow onSave={onCreateNewTask} /> : null}
                    {sections[status as "todo" | "in-progress" | "completed"] && (
                      <div className="space-y-2 bg-boxGray rounded-b-xl">
                        {tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <TaskListRow
                                isChecked={checkRows.includes(task.id)}
                                task={task}
                                onEdit={onChangeStatus}
                                onDelete={onDelete}
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
                        {tasks.length < 1 && <div className="h-[25vh] text-[#2F2F2F] font-mulish flex justify-center items-center font-medium">No task in {status}</div>}
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            ))}
          </>
        }

      </div>
    </DragDropContext>
  );
};

export default TaskList;
