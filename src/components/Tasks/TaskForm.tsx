import React, { useState } from "react";
import { uploadFile } from "../../utils/fileUpload.ts";
import TextEditor from "../TextEditor.tsx";
import DragAndDropFileInput from "../DragAndDropFileInput.tsx";
import CrossIcon from "../CloseIcon.tsx";

interface TaskFormProps {
  onSubmit: (task: { title: string; category: string; dueDate: string; files: string[] }) => void;
  onClose: () => void; // To handle closing the modal
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileUpload = async () => {
    try {
      setIsUploading(true);
      const fileURLs = await Promise.all(files.map((file) => uploadFile(file)));
      setUploadedFiles(fileURLs);
      setFiles([]);
      setIsUploading(false);
    } catch (error) {
      console.error("File upload failed:", error);
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, dueDate, files: uploadedFiles });
    setTitle("");
    setCategory("");
    setDueDate("");
    setUploadedFiles([]);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white overflow-hidden rounded-2xl font-mulish w-[45%] h-[85%] flex flex-col items-center justify-between m-0 space-y-4">
        <div className="h-1/8 w-full flex justify-between flex-col border-2 rounded-t-2xl  border-b-0 border-black">
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
        <div style={{ marginTop: "0px" }} className="overflow-y-auto pt-3 px-4 border-2 border-black w-full border-y-0 h-6/8 flex flex-1 flex-col">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
          />
          <TextEditor maxCharacters={300} />
          <div className="w-full flex mt-2">
            <div className="w-1/3 mr-3">
              <div className="opacity-60 text-xs mb-2">Task Category*</div>
              <div
                // onChange={(e) => setCategory(e.target.value)}
                className="flex justify-start items-center w-full"
              >
                <div className="cursor-pointer text-xs text-center rounded-full p-2 border-2 border-black border-opacity-10 w-[40%] bg-white font-bold" >Work</div>
                <div className="cursor-pointer text-xs text-center rounded-full p-2 ml-3 border-2 border-black border-opacity-10 w-[40%] bg-white font-bold" >Personal</div>
              </div>
            </div>
            <div className="w-1/3 mr-3">
              <div className="opacity-60 text-xs mb-2">Due on*</div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border-2 border-black border-opacity-10 bg-[#FAFAFA] rounded-lg p-2 w-full"
              />
            </div>
            <div className="w-1/3">
              <div className="opacity-60 text-xs mb-2">Task Status*</div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
              <DragAndDropFileInput onFileUpload={handleFileUpload} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "0px" }} className="bg-boxGray h-1/8 w-full justify-end p-2 py-4 font-bold text-sm items-center flex border-b-2 border-black border-opacity-10">
          <div onClick={onClose} className={`bg-white cursor-pointer mr-2 border-2 border-opacity-10 border-black text-black py-1 px-4 rounded-full`}>
            CANCEL
          </div>
          <div onClick={handleSubmit} className={`${isActive ? "bg-secondaryColor" : "bg-disableBtnBg"} text-white cursor-pointer py-1 px-4 rounded-full`}>
            CREATE
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
