import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Ellipses from "../Ellipses.tsx";
import StatusIcon from "../StatusIcon.tsx";
import DragIcon from "../DragIcon.tsx";
import Dropdown from "../DropDown.tsx";
import EditIcon from "../../assets/icons/edit_icon.svg"
import DeleteIcon from "../../assets/icons/delete_icon.svg"

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
}

interface TaskListRowProps {
  task: Task;
  index: number;
  provided: any;
  snapshot: any;
  onClick: (id: string) => void;
}

const TaskListRow: React.FC<TaskListRowProps> = ({ task, index, onClick, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const handleDropMenu = () => {
    setIsDrop(!isDrop)
  }

  const handleClick = () => {
    onClick(task.id)
  }

  return (
    <div
      onClick={handleClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`font-mulish font-medium text-black flex justify-between items-center border-t-2 border-opacity-10 border-black p-4 ${snapshot.isDragging ? "bg-white rounded-md shadow-lg" : ""
        }`}
    >
      <div className="flex items-center w-4/12">
        <input
          type="checkbox"
          className="mr-4 w-4 h-4 accent-secondaryColor"
        />
        <DragIcon />
        <StatusIcon status={task.status} />
        <h3 className="ml-3 text-base">{task.title}</h3>
      </div>

      <p className="w-2/12">{task.dueDate}</p>
      <div className="w-3/12">
        <div className="w-max rounded-md p-2 px-4 bg-[#DDDADD]">{task.status}</div>
      </div>
      <p className="w-2/12">{task.category}</p>

      <div className="w-1/12 h-6 flex justify-center items-center" onClick={handleDropMenu}>
        <Ellipses />
        {
          // isDrop ? <Dropdown images={[EditIcon, DeleteIcon]} options={["Edit", "Delete"]} onSelect={handleSelect} height="h-auto" width="w-[10%]" /> : <></>
          isDrop ? <Dropdown height="h-auto" width="w-[10%]" >
            <li className="flex p-2 hover:bg-[#fadfdf]"><img className="mr-3" src={EditIcon} /> Edit</li>
            <li className="flex p-2 hover:bg-[#fadfdf]"><img className="mr-3" src={DeleteIcon} /> Delete</li>
          </Dropdown> : <></>
        }
      </div>

    </div>
  );
};

export default TaskListRow;
