import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Ellipses from "../Ellipses.tsx";
import StatusIcon from "../StatusIcon.tsx";
import DragIcon from "../DragIcon.tsx";
import Dropdown from "../DropDown.tsx";
import EditIcon from "../../assets/icons/edit_icon.svg"
import DeleteIcon from "../../assets/icons/delete_icon.svg"
import { format } from "date-fns";
import { Task } from "../../features/tasks/taskSlice.ts";

interface TaskListRowProps {
  task: Task;
  index: number;
  isChecked: boolean;
  provided: any;
  snapshot: any;
  onClick: (id: string) => void;
  onRowCheck: (id: string) => void;
  onEdit: (id: string, status: "todo" | "in-progress" | "completed" | "") => void;
  onDelete: (id: string) => void;
}

const TaskListRow: React.FC<TaskListRowProps> = ({ onEdit, onDelete, isChecked, task, index, onClick, onRowCheck, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const [isStatusOpen, setIsStatusOpen] = useState<Boolean>(false)
  const handleDropMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDrop(!isDrop)
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDrop(false);
    onClick(task.id);
  }

  const handleStatusChange = (e: React.MouseEvent, newStatus: "todo" | "in-progress" | "completed") => {
    e.stopPropagation();
    onEdit(task.id, newStatus);
  }

  const getStatusOptionBg = (status: string) => {
    if (task.status == status) return "bg-pink-200"
    return "bg-none"
  };

  const getDateLabel = (date: Date | string | null) => {
    if (new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)) return "Today"
    return format(task.dueDate, "dd MMM, yyyy");
  }

  const handleRowCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRowCheck(task.id);
  }

  return (
    <div
      onClick={handleClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`font-mulish font-medium text-sm text-black flex justify-between items-center border-0 border-t-2 border-opacity-10 border-black outline-none p-4 py-3 pb-0.5 ${snapshot.isDragging ? "bg-white rounded-md shadow-lg" : ""
        }`}
    >
      <div className="flex items-center w-full md:w-4/12 overflow-hidden">
        <input
          onClick={handleRowCheck}
          checked={isChecked}
          type="checkbox"
          className="cursor-pointer mr-4 md:mr-2 w-3.5 h-3.5 border-2 border-opacity-60 rounded-sm border-black bg-white appearance-none checked:bg-secondaryColor checked:border-secondaryColor checked:before:text-[10px] checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:justify-center checked:before:items-center checked:before:relative checked:before:top-[-4px]"
        />
        <DragIcon />
        <StatusIcon status={task.status} />
        <h3
          className={`ml-3 text-sm md:pr-20 ${task.status === "completed" ? "line-through" : ""} overflow-hidden whitespace-nowrap text-ellipsis`}
          style={{ maxWidth: "calc(100% - 100px)" }}
        >
          {task.title}
        </h3>
      </div>


      <p className="hidden md:flex w-3/12">{getDateLabel(task.dueDate)}</p>
      <div className="hidden md:flex w-3/12 cursor-pointer relative items-center">
        <div
          onClick={(e) => { e.stopPropagation(); setIsStatusOpen(!isStatusOpen) }}
          className="flex justify-center items-center text-sm"
        >
          <div className="w-max rounded-md p-1 px-4 bg-[#DDDADD]">{(task.status).toUpperCase()}</div>
        </div>
        {
          isStatusOpen &&
          <Dropdown height="h-auto" width="w-max">
            <div onClick={(e) => handleStatusChange(e, "todo")} className={`text-xs text-left px-2 mb-1 font-semibold ${getStatusOptionBg("todo")}  hover:bg-pink-100 rounded-sm`}>TO-DO</div>
            <div onClick={(e) => handleStatusChange(e, "in-progress")} className={`text-xs text-left px-2 mb-1 font-semibold ${getStatusOptionBg("in-progress")}  hover:bg-pink-100 rounded-sm`}>IN PROGRESS</div>
            <div onClick={(e) => handleStatusChange(e, "completed")} className={`text-xs text-left px-2 mb-1 font-semibold ${getStatusOptionBg("completed")}  hover:bg-pink-100 rounded-sm`}>COMPLETED</div>
          </Dropdown>
        }
      </div>

      <p className="hidden md:flex w-3/12">{task.category}</p>
      <div className="hidden md:flex w-16 h-6 justify-center items-center relative" onClick={handleDropMenu}>
        <Ellipses />
        {
          isDrop ? <Dropdown height="h-auto" width="w-[230%]" position="top-full right-[24%]" >
            <li onClick={handleClick} className="flex pl-2 pr-4 hover:bg-pink-100 rounded-md font-semibold"><img className="mr-3" src={EditIcon} /> Edit</li>
            <li onClick={() => onDelete(task.id)} className="flex pl-2 pt-2 pr-4 hover:bg-pink-100 rounded-md font-semibold text-[#DA2F2F]"><img className="mr-3" src={DeleteIcon} /> Delete</li>
          </Dropdown> : <></>
        }
      </div>

    </div>
  );
};

export default TaskListRow;
