import React, { useState } from 'react'
import Ellipses from "../Ellipses.tsx";
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

interface TaskBoardCardProps {
  task: Task;
  index: number;
  provided: any;
  snapshot: any;
}

const TaskBoardCard: React.FC<TaskBoardCardProps> = ({ task, index, provided, snapshot }) => {
  const [isDrop, setIsDrop] = useState<Boolean>(false)
  const handleDropMenu = () => {
    setIsDrop(!isDrop)
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white p-4 pb-1 rounded-2xl border-[#585751] border-2 border-opacity-[28%]"
    >
      <div className="w-full h-1/2 flex relative justify-between items-center my-2">
        <h3 className="text-md font-bold">{task.title}</h3>
        <div className="w-1/12 h-6 flex justify-center items-center" onClick={handleDropMenu}>
          <Ellipses />
          {
            // isDrop ? <Dropdown images={[EditIcon, DeleteIcon]} options={["Edit", "Delete"]} onSelect={handleSelect} height="h-auto" width="w-[10%]" /> : <></>
            isDrop ? <Dropdown height="h-auto" width="w-[35%]" >
              <li className="flex p-2 hover:bg-[#fadfdf]"><img className="mr-3" src={EditIcon} /> Edit</li>
              <li className="flex p-2 hover:bg-[#fadfdf]"><img className="mr-3" src={DeleteIcon} /> Delete</li>
            </Dropdown> : <></>
          }
        </div>
      </div>
      <div className="w-full h-1/2 flex justify-between items-end mt-12">
        <p className="text-sm text-black opacity-[52%]">{task.category}</p>
        <p className="text-sm text-black opacity-[52%]">{task.dueDate}</p>
      </div>
    </div>
  )
}

export default TaskBoardCard