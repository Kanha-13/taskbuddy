// src/components/TaskForm.tsx
import React, { useState } from "react";
import { uploadFile } from "../../utils/fileUpload";

interface TaskFormProps {
  onSubmit: (task: { title: string; category: string; dueDate: string; files: string[] }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <button
        type="button"
        onClick={handleFileUpload}
        disabled={isUploading || files.length === 0}
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        {isUploading ? "Uploading..." : "Upload Files"}
      </button>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
