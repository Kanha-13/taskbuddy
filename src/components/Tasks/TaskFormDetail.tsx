import React from 'react'
import DragAndDropFileInput from '../DragAndDropFileInput.tsx'
import TextEditor from '../TextEditor.tsx'

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
    e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    text?: string,
    files?: File[]) => void;
  taskDetails: Task;
}


const TaskFormDetail: React.FC<TaskFormDetailProps> = ({ taskDetails, handleChange }) => {
  const getBg = (cat: string) => {
    if (taskDetails.category == cat)
      return "bg-secondaryColor text-white"
    return "bg-white text-black"
  }

  return (
    <div style={{ marginTop: "0px" }} className="overflow-y-auto pt-3 px-4 w-full h-full flex flex-1 flex-col">
      <input
        type="text"
        placeholder="Task Title"
        value={taskDetails.title}
        onChange={(e) => handleChange("title", e)}
        className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
      />
      <TextEditor value={taskDetails.description} onchange={(text) => handleChange("description", undefined, text)} maxCharacters={300} />
      <div className="w-full flex mt-2">
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
        <div className="w-1/3 mr-3">
          <div className="opacity-60 text-xs mb-2">Due on*</div>
          <input
            type="date"
            value={taskDetails.dueDate}
            onChange={(e) => handleChange("dueDate", e)}
            className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          />
        </div>
        <div className="w-1/3">
          <div className="opacity-60 text-xs mb-2">Task Status*</div>
          <select
            value={taskDetails.status}
            onChange={(e) => handleChange("status", e)}
            className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="todo">TODO</option>
            <option value="in-progress">IN-PROGRESS</option>
            <option value="completed">COMPLETED</option>
          </select>
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