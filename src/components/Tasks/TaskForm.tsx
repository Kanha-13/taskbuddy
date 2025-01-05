import React, { useEffect, useState } from "react";
import { uploadFile } from "../../utils/fileUpload.ts";
import CrossIcon from "../CloseIcon.tsx";
import TaskFormDetail from "./TaskFormDetail.tsx";
import ActivityLog from "../Activity/ActivityLog.tsx";

const logs = [
  { detail: "You created this task", date: "Dec 27 at 1:15 pm" },
  { detail: "You uploaded file", date: "Dec 28 at 1:15 pm" },
  { detail: "You changed the status from in progress to complete", date: "Dec 29 at 1:15 pm" },
]

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  category: string;
  dueDate: string;
  files?: string[];
  description?: string;
}

interface TaskFormProps {
  taskData?: Task;
  onSubmit: (task: Task) => void;
  onClose: () => void; // To handle closing the modal
  mode: "update" | "create";
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose, mode, taskData }) => {
  const [isActive, setIsActive] = useState<Boolean>(false);

  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    status: "todo",
    category: "",
    dueDate: "",
    files: [],
  });

  const handleChange = (
    key: keyof Task,
    value: any
  ) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(task);
  }

  const getWidth = () => {
    if (mode == "update")
      return "w-[70%]"
    return "w-[45%]"
  }

  useEffect(() => {
    if (taskData?.id)
      setTask(taskData);
  }, [taskData])

  return (
    <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-70 flex justify-center items-center z-50">
      <div className={`bg-white overflow-hidden rounded-2xl font-mulish ${getWidth()} h-[85%] flex flex-col items-center justify-between m-0 space-y-4`}>
        <div className={`h-1/8 w-full flex justify-between flex-col rounded-t-2xl ${mode == "create" ? "border-2 border-b-0 border-black" : ""}`}>
          <div className="h-auto w-full flex justify-between font-semibold text-2xl p-6 items-center">
            <div className="">Create Task</div>
            <div
              onClick={onClose}
              className="self-end cursor-pointer pb-1 text-xl font-bold"
            >
              <CrossIcon size={20} />
            </div>
          </div>
          <div style={{ marginTop: "0px" }} className="w-[100%] h-0 border-t-2 border-black border-opacity-10"></div>
        </div>
        <div style={{ marginTop: "0px" }} className="overflow-hidden h-6/8 w-full flex flex-1 border-b-2 border-black border-opacity-10">
          <div className={`${mode == "create" ? "w-full h-full border-2 border-black border-y-0" : "w-2/3 h-full"}`}>
            <TaskFormDetail taskDetails={task} handleChange={handleChange} />
          </div>
          {mode == "update" ?
            <div className="flex w-1/3">
              <div style={{ marginTop: "0px" }} className="m-0 h-full border-l-2 border-black border-opacity-10"></div>
              <ActivityLog logs={logs} />
            </div> : <></>
          }
        </div>
        <div style={{ marginTop: "0px" }} className="bg-boxGray h-1/8 w-full justify-end p-2 py-4 font-bold text-sm items-center flex border-b-2 border-black border-opacity-10">
          <div onClick={onClose} className={`bg-white cursor-pointer mr-2 border-2 border-opacity-10 border-black text-black py-2 px-4 rounded-full`}>
            CANCEL
          </div>
          <div onClick={handleSubmit} className={`${isActive ? "bg-secondaryColor" : "bg-disableBtnBg"} text-white cursor-pointer py-2 px-4 rounded-full`}>
            {mode == "create" ? "CREATE" : "UPDATE"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
