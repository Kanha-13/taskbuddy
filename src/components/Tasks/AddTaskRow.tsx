import React, { useState } from "react";
import { ReactComponent as EnterIcon } from "../../assets/icons/enter.svg"
import { ReactComponent as Calender } from "../../assets/icons/calender_icon.svg"
import DateRangePicker from "../DateRangePicker.tsx";
import { format } from "date-fns";
import Dropdown from "../DropDown.tsx";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed" | "";
  category: "Work" | "Personal" | "";
  dueDate: Date | string | null;
  files?: string[];
  description?: string;
}

interface DateRange {
  startDate: Date | string | null;
  endDate: Date | string | null;
}

interface AddTaskRowProps {
  onSave: (task: Task) => void;
}

const AddTaskRow: React.FC<AddTaskRowProps> = ({ onSave }) => {
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    status: "",
    category: "",
    dueDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date: DateRange) => {
    setDateRange(date)
    setTask((prevTask) => ({ ...prevTask, dueDate: `${date.startDate}` }));
  };

  const handleSave = () => {
    onSave(task)
    setTask({ id: "", title: "", status: "", category: "", dueDate: null });
    setIsAdding(false);
  };

  const getStatusOptionBg = (status: string) => {
    if (task.status == status) return "bg-pink-200"
    return "bg-none"
  };

  const getCatOptionBg = (cat: string) => {
    if (task.category == cat) return "bg-pink-200"
    return "bg-none"
  }

  return (
    <div className="pb-2 font-mulish flex flex-col bg-boxGray">
      <div onClick={() => setIsAdding(!isAdding)} className="text-opacity-80 font-bold cursor-pointer self-start mt-4 ml-16 pl-6">
        <span className="text-2xl text-secondaryColor font-semibold">+</span> ADD TASK
      </div>
      {isAdding && (
        <>
          <div className="font-mulish font-medium text-black flex justify-between items-center border-t-2 border-opacity-10 border-black p-4 ">
            <div className="w-4/12">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={task.title}
                onChange={handleInputChange}
                className="p-3 px-20 bg-transparent border-none outline-none"
              />
            </div>
            <div className="w-3/12 cursor-pointer relative">
              <div
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex justify-center w-max items-center text-xs px-4 border border-black border-opacity-20 rounded-full py-2 text-gray-700 hover:shadow-md"
              >
                <Calender />
                <span className="ml-2">{dateRange.startDate
                  ? `${format(dateRange.startDate, "dd MMMM yyyy")}`
                  : "Add date"}</span>
              </div>
              {isDatePickerOpen && (
                <DateRangePicker mode="single" value={dateRange} onChange={handleDateChange} />
              )}
            </div>
            <div className="w-3/12 cursor-pointer relative flex items-center">
              <div
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex justify-center items-center text-xs border border-black border-opacity-20 rounded-full hover:shadow-md"
              >
                {task.status ?
                  <div className="p-2 px-3">{task.status}</div> :
                  <div className="p-0.5 text-2xl rounded-full w-10 text-center h-10 font-bold">+</div>
                }
              </div>
              {
                isStatusOpen &&
                <Dropdown height="h-auto" width="w-max">
                  <div onClick={() => setTask({ ...task, status: "todo" })} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("todo")}  hover:bg-pink-100 rounded-sm`}>TO-DO</div>
                  <div onClick={() => setTask({ ...task, status: "in-progress" })} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("in-progress")}  hover:bg-pink-100 rounded-sm`}>IN PROGRESS</div>
                  <div onClick={() => setTask({ ...task, status: "completed" })} className={`text-left px-2 mb-1 font-semibold ${getStatusOptionBg("completed")}  hover:bg-pink-100 rounded-sm`}>COMPLETED</div>
                </Dropdown>
              }
            </div>
            <div className="w-3/12 cursor-pointer relative flex items-center">
              <div
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex justify-center items-center text-xs border border-black border-opacity-20 rounded-full hover:shadow-md"
              >
                {task.category ?
                  <div className="p-2 px-3">{task.category}</div> :
                  <div className="p-0.5 text-2xl rounded-full w-10 text-center h-10 font-bold">+</div>
                }
              </div>
              {
                isCategoryOpen &&
                <Dropdown height="h-auto" width="w-max">
                  <div onClick={() => setTask({ ...task, category: "Work" })} className={`text-left px-2 mb-1 font-semibold ${getCatOptionBg("Work")}  hover:bg-pink-100 rounded-sm`}>Work</div>
                  <div onClick={() => setTask({ ...task, category: "Personal" })} className={`text-left px-2 mb-1 font-semibold ${getCatOptionBg("Personal")}  hover:bg-pink-100 rounded-sm`}>Personal</div>
                </Dropdown>
              }
            </div>
            <div className="w-16">.</div>
          </div>
          <div className="w-max pl-24 flex">
            <div
              onClick={handleSave}
              className="items-center flex w-24 my-3 mb-5 px-0 font-bold justify-center py-1 mr-6 bg-secondaryColor text-white border-none  rounded-full cursor-pointer"
            >
              ADD
              <EnterIcon className="ml-2 w-5 h-5" />
            </div>
            <button onClick={() => setIsAdding(!isAdding)} className="font-semibold outline-none">
              CANCEL
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTaskRow;
