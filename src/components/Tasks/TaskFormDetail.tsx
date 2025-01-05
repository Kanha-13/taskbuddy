import React, { useState } from 'react'
import DragAndDropFileInput from '../DragAndDropFileInput.tsx'
import TextEditor from '../TextEditor.tsx'
import { ReactComponent as Calender } from "../../assets/icons/calender_icon.svg"
import DateRangePicker from '../DateRangePicker.tsx';
import { format } from 'date-fns';
import Dropdown from '../DropDown.tsx';
import DropIcon from '../DropIcon.tsx';

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  category: string;
  dueDate: string;
  files?: string[];
  description?: string;
}

interface TaskFormDetailProps {
  handleChange: (
    key: keyof Task,
    value: any
  ) => void;
  taskDetails: Task;
}

interface DateRange {
  startDate: Date | string | null;
  endDate: Date | string | null;
}


const TaskFormDetail: React.FC<TaskFormDetailProps> = ({ taskDetails, handleChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

  const getBg = (cat: string) => {
    if (taskDetails.category == cat)
      return "bg-secondaryColor text-white"
    return "bg-white text-black"
  }

  const handleDateChange = (date: DateRange) => {
    setDateRange(date)
    handleChange("dueDate", `${date.startDate}`)
    // setTask((prevTask) => ({ ...prevTask, dueDate: date.startDate }));
  };

  const getStatusOptionBg = (status: string) => {
    if (taskDetails.status == status) return "bg-pink-200"
    return "bg-none"
  };

  return (
    <div style={{ marginTop: "0px" }} className="overflow-y-auto pt-3 px-6 w-full h-full flex flex-1 flex-col">
      <input
        type="text"
        placeholder="Task Title"
        value={taskDetails.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
      />
      <TextEditor value={taskDetails.description} onchange={(text) => handleChange("description", text)} maxCharacters={300} />
      <div className="w-full flex mt-2 items-center">
        <div className="w-1/3 mr-3">
          <div className="opacity-60 text-xs mb-2">Task Category*</div>
          <div
            // onChange={(e) => setCategory(e.target.value)}
            className="flex justify-start items-center w-full"
          >
            <div className={`cursor-pointer text-xs text-center rounded-full p-2 border-2 border-black border-opacity-10 w-[40%] ${getBg("Work")} font-bold`}>Work</div>
            <div className={`cursor-pointer text-xs text-center rounded-full p-2 ml-3 border-2 border-black border-opacity-10 w-[40%] ${getBg("Personal")} font-bold`}>Personal</div>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer relative mr-3">
          <div className="opacity-60 text-xs mb-2">Due on*</div>
          <div
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex justify-between items-center border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          >
            <span className="ml-2 text-xs">{dateRange.startDate
              ? `${format(dateRange.startDate, "dd MMMM yyyy")}`
              : "DD/MM/YYYY"}</span>
            <Calender />
          </div>
          {isDatePickerOpen && (
            <DateRangePicker mode="single" value={dateRange} onChange={handleDateChange} />
          )}
        </div>
        {/* <div className="w-1/3 mr-3">
          <div className="opacity-60 text-xs mb-2">Due on*</div>
          <input
            type="date"
            value={taskDetails.dueDate}
            onChange={(e) => handleChange("dueDate", e)}
            className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          />
        </div> */}
        <div className="w-1/3 text-xs cursor-pointer relative mr-3">
          <div className="opacity-60 text-xs mb-2">Task Status*</div>
          <div
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex justify-between items-center border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          >
            <div className="">{taskDetails.status}</div>
            <DropIcon size="w-3 h-3" color="text-[#484B52]" isOpen={isStatusOpen} />
          </div>
          {
            isStatusOpen &&
            <Dropdown height="h-auto" width="w-max">
              <div onClick={() => handleChange("status", "todo")} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("todo")}  hover:bg-pink-100 rounded-sm`}>TO-DO</div>
              <div onClick={() => handleChange("status", "in-progress")} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("in-progress")}  hover:bg-pink-100 rounded-sm`}>IN PROGRESS</div>
              <div onClick={() => handleChange("status", "completed")} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("completed")}  hover:bg-pink-100 rounded-sm`}>COMPLETED</div>
            </Dropdown>
          }
        </div>
      </div>
      <div className="mt-6">
        <div className="opacity-60 text-xs mb-2">Attachment</div>
        <div className="border bg-[#FAFAFA] border-gray-300 rounded-lg p-2 w-full">
          <DragAndDropFileInput onFileUpload={handleChange} />
        </div>
      </div>
    </div>
  )
}

export default TaskFormDetail;