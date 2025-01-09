import React, { useState } from 'react'
import Ellipses from "../Ellipses.tsx";
import Dropdown from "../DropDown.tsx";
import EditIcon from "../../assets/icons/edit_icon.svg"
import DeleteIcon from "../../assets/icons/delete_icon.svg"
import { format } from 'date-fns';
import { Task } from '../../features/tasks/taskSlice.ts';

interface TaskBoardCardProps {
  task: Task;
  index: number;
  provided: any;
  snapshot: any;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskBoardCard: React.FC<TaskBoardCardProps> = ({ onDelete, task, index, onClick, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const handleDropMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDrop(!isDrop)
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(task.id)
    setIsDrop(false);
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
      className="bg-white outline-none p-4 h-[14vh] pb-1 font-mulish rounded-2xl my-3 border-[#585751] border border-opacity-[28%]"
    >
      <div className="w-full h-max flex relative justify-between items-center mb-2">
        <h3 className={`text-md font-bold ${task.status === "completed" ? "line-through" : ""}`}>{task.title}</h3>
        <div className="w-1/12 h-6 flex justify-center items-center" onClick={handleDropMenu}>
          <Ellipses />
          {
            isDrop ? <Dropdown height="h-auto" width="w-[43%]" position='top-full right-1' >
              <li onClick={handleClick} className="flex pl-2 hover:bg-pink-100 font-semibold"><img className="mr-3" src={EditIcon} /> Edit</li>
              <li onClick={() => onDelete(task.id)} className="flex pl-2 mt-1 hover:bg-pink-100 font-semibold text-[#DA2F2F]"><img className="mr-3" src={DeleteIcon} /> Delete</li>
            </Dropdown> : <></>
          }
        </div>
      </div>
      <div className="w-full h-max flex justify-between items-end mt-12">
        <p className="text-xs text-black opacity-[52%]">{task.category}</p>
        <p className="text-xs text-black opacity-[52%]">{getDateLabel(task.dueDate)}</p>

      </div>
    </div>
  )
}

export default TaskBoardCard