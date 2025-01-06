import React, { useState } from 'react'
import Dropdown from '../DropDown.tsx'
import { ReactComponent as TaskIcon } from "../../assets/icons/tasks_icon.svg"

interface MultiRowsCheckModalProps {
  onDelete: () => void;
  onChangeStatus: (status: "todo" | "in-progress" | "completed") => void;
  onCancel: () => void;
  count: number;
}

const MultiRowsCheckModal: React.FC<MultiRowsCheckModalProps> = ({ onDelete, onChangeStatus, onCancel, count }) => {
  const [isStatusOpen, setIsStatusOpen] = useState<Boolean>(false);

  const handleStatusChange = (e: React.MouseEvent, newStatus: "todo" | "in-progress" | "completed") => {
    e.stopPropagation();
    onChangeStatus(newStatus)
  }

  return (
    <div className='font-mulish absolute w-[95%] top-[90vh] flex justify-center items-center'>
      <div className='w-[30%] bg-[#1A1C20] h-12 rounded-xl py-8 flex justify-between px-5 items-center' >
        <div className='text-xs font-semibold border border-opacity-60 border-white p-2 px-4 text-white rounded-full'>{count} {count > 1 ? "Tasks" : "Task"} selected <span className='ml-2 cursor-pointer' onClick={onCancel}>X</span></div>
        <TaskIcon className="mr-10" />
        <div className="w-3/12 cursor-pointer relative flex items-center">
          <div
            onClick={(e) => { e.stopPropagation(); setIsStatusOpen(!isStatusOpen) }}
            className="flex justify-center items-center border border-white border-opacity-40 p-2 px-4 ml-auto rounded-full bg-[#8D8A8A] bg-opacity-[14%]"
          >
            <div className="text-xs font-semibold text-white">Status</div>
          </div>
          {
            isStatusOpen &&
            <Dropdown height="h-auto" width="w-max" position='bottom-[150%] right-0' bgColor="bg-[#1A1C20] text-white" border='border-none'>
              <div onClick={(e) => handleStatusChange(e, "todo")} className={`text-left px-2 mb-1 font-semibold hover:bg-gray-700 rounded-sm`}>TO-DO</div>
              <div onClick={(e) => handleStatusChange(e, "in-progress")} className={`text-left px-2 mb-1 font-semibold  hover:bg-gray-700 rounded-sm`}>IN PROGRESS</div>
              <div onClick={(e) => handleStatusChange(e, "completed")} className={`text-left px-2 mb-1 font-semibold  hover:bg-gray-700 rounded-sm`}>COMPLETED</div>
            </Dropdown>
          }
        </div>
        <div onClick={onDelete} className='text-xs font-semibold cursor-pointer p-2 px-4 text-[#E13838] border border-[#e1383878] bg-[#FF3535] rounded-full bg-opacity-[14%]'>Delete</div>
      </div>
    </div>
  )
}

export default MultiRowsCheckModal