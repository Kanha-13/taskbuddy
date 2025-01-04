import React, { useState } from "react";
import { ReactComponent as EnterIcon } from "../../assets/icons/enter.svg"

type Task = {
  title: string;
  status: string;
  category: string;
  dueDate: Date | null;
};

const AddTaskRow: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState<Task>({
    title: "",
    status: "Pending",
    category: "Work",
    dueDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setTask((prevTask) => ({ ...prevTask, dueDate: date }));
  };

  const handleSave = () => {
    console.log("Task saved:", task);
    // Add your logic to save the task
    setTask({ title: "", status: "Pending", category: "Work", dueDate: null });
    setIsAdding(false);
  };

  return (
    <div className="pb-2 font-mulish flex flex-col bg-boxGray">
      <div onClick={() => setIsAdding(!isAdding)} className="font-bold cursor-pointer self-start mt-4 ml-16 pl-3">
        ADD TASK
      </div>
      {isAdding && (
        <div className="border-t-2 border-opacity-10 border-black mt-3 flex flex-row flex-wrap px-16 pt-2 justify-between gap-2 w-full">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleInputChange}
            className="p-3 bg-transparent border-none outline-none"
          />
          <input type="date"
            value={task.dueDate}
            onChange={handleDateChange}
            placeholder="Select Due Date"
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <select
            name="status"
            value={task.status}
            onChange={handleInputChange}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            name="category"
            value={task.category}
            onChange={handleInputChange}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <div></div>
          <div className="w-full flex">
            <div
              onClick={handleSave}
              className="items-center flex w-1/12 my-3 mb-5 px-1 font-bold justify-center py-2 mr-6 bg-secondaryColor text-white border-none  rounded-full cursor-pointer"
            >
              ADD
              <EnterIcon className="ml-2 w-5 h-5" />
            </div>
            <button onClick={() => setIsAdding(!isAdding)} className="font-semibold">
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskRow;
