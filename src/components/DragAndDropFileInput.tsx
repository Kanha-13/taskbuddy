import React, { useState, DragEvent } from 'react';

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  category: string;
  dueDate: string;
  files?: string[];
  description?: string;
}

interface DragAndDropProps {
  onFileUpload: (
    key: keyof Task,
    e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    text?: string,
    files?: File[]) => void;
}

const DragAndDropFileInput: React.FC<DragAndDropProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(files);
    onFileUpload("files", undefined, "", files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setUploadedFiles(files);
    onFileUpload("files", undefined, "", files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: isDragging ? '2px dashed #2956DD' : '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragging ? '#f0f8ff' : '#fff',
        transition: 'background-color 0.3s ease',
      }}
    >
      <p style={{ margin: 0 }}>
        Drop your files here or{' '}
        <label className='text-[#2956DD] cursor-pointer underline underline-offset-1'>
          Update
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
      </p>
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Uploaded Files:</h4>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragAndDropFileInput;
