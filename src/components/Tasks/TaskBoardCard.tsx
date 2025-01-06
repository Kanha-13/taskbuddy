import React, { useState } from 'react'
import Ellipses from "../Ellipses.tsx";
import Dropdown from "../DropDown.tsx";
import EditIcon from "../../assets/icons/edit_icon.svg"
import DeleteIcon from "../../assets/icons/delete_icon.svg"
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
}

interface TaskBoardCardProps {
  task: Task;
  index: number;
  provided: any;
  snapshot: any;
  onClick: (id: string) => void;
  onEdit: (id: string, status: "todo" | "in-progress" | "completed") => void;
  onDelete: (id: string) => void;
}

const TaskBoardCard: React.FC<TaskBoardCardProps> = ({ onEdit, onDelete, task, index, onClick, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const handleDropMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDrop(!isDrop)
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(task.id)
  }

  const getDateLabel = (date: string) => {
    if (new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)) return "Today"
    return format(task.dueDate, "dd MMM, yyyy");
  }

  return (
    <div
      onClick={handleClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white outline-none p-4 pb-1 font-mulish rounded-2xl my-3 border-[#585751] border border-opacity-[28%]"
    >
      <div className="w-full h-1/2 flex relative justify-between items-center mb-2">
        <h3 className={`text-md font-bold ${task.status === "completed" ? "line-through" : ""}`}>{task.title}</h3>
        <div className="w-1/12 h-6 flex justify-center items-center" onClick={handleDropMenu}>
          <Ellipses />
          {
            isDrop ? <Dropdown height="h-auto" width="w-[43%]" position='top-full right-1' >
              <li className="flex pl-2 hover:bg-[#fadfdf] font-semibold"><img className="mr-3" src={EditIcon} /> Edit</li>
              <li className="flex pl-2 mt-1 hover:bg-[#fadfdf] font-semibold text-[#DA2F2F]"><img className="mr-3" src={DeleteIcon} /> Delete</li>
            </Dropdown> : <></>
          }
        </div>
      </div>
      <div className="w-full h-1/2 flex justify-between items-end mt-12">
        <p className="text-xs text-black opacity-[52%]">{task.category}</p>
        <p className="text-xs text-black opacity-[52%]">{getDateLabel(task.dueDate)}</p>

      </div>
    </div>
  )
}

export default TaskBoardCard