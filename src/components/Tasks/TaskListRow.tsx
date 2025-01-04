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
}

const TaskListRow: React.FC<TaskListRowProps> = ({ task, index, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const handleDropMenu = () => {
    setIsDrop(!isDrop)
  }
  const handleSelect = (option: string) => {
    if (option == "Edit") {

    } else {

    }
    setIsDrop(false)
  }
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`font-mulish font-medium text-black flex justify-between items-center border-t-2 border-opacity-10 border-black p-4 ${snapshot.isDragging ? "bg-white rounded-md shadow-lg" : ""
        }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-4 w-4 h-4 accent-secondaryColor"
        />
        <DragIcon />
        <StatusIcon status={task.status} />
        <h3 className="ml-3 text-base">{task.title}</h3>
      </div>

      <p>{task.dueDate}</p>
      <p>{task.category}</p>

      <div className="w-8 h-6 flex justify-center items-center" onClick={handleDropMenu}>
        <Ellipses />
        {
          isDrop ? <Dropdown images={[EditIcon, DeleteIcon]} options={["Edit", "Delete"]} onSelect={handleSelect} height="h-auto" width="w-[10%]" /> : <></>
        }
      </div>

    </div>
  );
};

export default TaskListRow;
