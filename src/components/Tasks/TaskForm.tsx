import React, { useEffect, useState } from "react";
import CrossIcon from "../CloseIcon.tsx";
import TaskFormDetail from "./TaskFormDetail.tsx";
import ActivityLog from "../Activity/ActivityLog.tsx";
import { Task } from "../../features/tasks/taskSlice.ts";

interface TaskFormProps {
  taskData?: Task | undefined | null;
  onSubmit: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onClose: () => void; // To handle closing the modal
  mode: "update" | "create";
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onUpdate, onClose, mode, taskData }) => {
  const [isActive, setIsActive] = useState<Boolean>(false);
  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    status: "todo",
    category: "",
    dueDate: "",
    files: [],
  });

  const handleChange = async (
    key: keyof Task,
    value: any
  ) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key == "filesToDelete") await onUpdate({
      ...task,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    if (mode === "create") onSubmit(task);
    else onUpdate(task);
    setTask({
      id: "",
      title: "",
      status: "todo",
      category: "",
      dueDate: "",
      files: [],
    });
  };

  const getSize = () => {
    if (mode === "update") return "md:w-[70%] h-[95%] md:h-[85%]";
    return "md:w-[45%] md:h-[85%]";
  };

  const getTabBg = (tabName: string) => {
    return activeTab === tabName ? "bg-[#271E1E] text-white" : ""
  }

  useEffect(() => {
    if (taskData?.id) setTask(taskData);
  }, [taskData]);

  useEffect(() => {
    if (task.category != "" && task.title != "" && task.dueDate != "" && task.status != "")
      setIsActive(true)
    else setIsActive(false)
  }, [task])

  return (
    <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-70 flex items-end justify-center md:items-center z-50">
      <div className={`bg-white overflow-hidden rounded-2xl rounded-b-none md:rounded-2xl font-mulish w-full ${getSize()} flex flex-col items-center justify-between m-0 space-y-4`}>
        <div className={`h-1/8 w-full flex justify-between flex-col rounded-t-2xl ${mode === "create" ? "md:border-2 md:border-b-0 border-black" : ""}`}>
          <div className="h-auto w-full flex justify-between font-semibold text-xl md:text-2xl p-6 items-center">
            <div className="">{mode === "create" ? "Create Task" : "Update Task"}</div>
            <div
              onClick={onClose}
              className="self-end cursor-pointer pb-1 text-xl font-bold"
            >
              <CrossIcon size={20} />
            </div>
          </div>
          <div style={{ marginTop: "0px" }} className="w-[100%] h-0 border-t-2 border-black border-opacity-10"></div>
        </div>
        {/* Tab Buttons for Mobile */}
        {
          mode == "update" &&
          <div className="flex md:hidden w-full justify-around pb-6 pt-2">
            <button
              onClick={() => setActiveTab("details")}
              className={`w-[55%] rounded-full p-2 border-2 border-black border-opacity-20 text-center font-bold ${getTabBg("details")}`}
            >
              Details
            </button>
            {mode === "update" && (
              <button
                onClick={() => setActiveTab("activity")}
                className={`w-[35%] rounded-full p-2 border-2 border-black border-opacity-20 text-center font-bold ${getTabBg("activity")}`}
              >
                Activity
              </button>
            )}
          </div>
        }
        {/* Content Section */}
        <div style={{ marginTop: "0px" }} className="overflow-hidden h-6/8 w-full flex flex-1 border-b-2 border-black border-opacity-10">
          {/* Desktop View */}
          <div className="hidden md:flex w-full">
            <div className={`${mode === "create" ? "w-full h-full md:border-2 border-black md:border-y-0" : "w-2/3 h-full"}`}>
              <TaskFormDetail taskDetails={task} handleChange={handleChange} />
            </div>
            {mode === "update" ? (
              <div className="flex w-1/3">
                <div style={{ marginTop: "0px" }} className="m-0 h-full border-l-2 border-black border-opacity-10"></div>
                <ActivityLog logs={task.activityLogs} />
              </div>
            ) : null}
          </div>
          {/* Mobile Tab View */}
          <div className="md:hidden w-full">
            {activeTab === "details" && <TaskFormDetail taskDetails={task} handleChange={handleChange} />}
            {activeTab === "activity" && mode === "update" && <ActivityLog logs={task.activityLogs} />
            }
          </div>
        </div>
        <div style={{ marginTop: "0px" }} className="bg-boxGray h-1/8 w-full justify-end p-2 py-4 font-bold text-sm items-center flex border-b-2 border-black border-opacity-10">
          <div onClick={onClose} className={`bg-white cursor-pointer mr-2 border-2 border-opacity-10 border-black text-black py-2 px-4 rounded-full`}>
            CANCEL
          </div>
          <div onClick={handleSubmit} className={`${isActive ? "bg-secondaryColor" : "bg-disableBtnBg"} text-white cursor-pointer py-2 px-4 rounded-full`}>
            {mode === "create" ? "CREATE" : "UPDATE"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
