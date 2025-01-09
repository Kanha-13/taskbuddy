import React, { useState, DragEvent } from 'react';
import { Task } from '../features/tasks/taskSlice';

interface DragAndDropProps {
  onFileUpload: (
    key: keyof Task,
    value?: File[]
  ) => void;
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
    onFileUpload('filesData', files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setUploadedFiles(files);
    onFileUpload('filesData', files);
  };

  const handleClearFiles = () => {
    setUploadedFiles([]);
    onFileUpload('filesData', []);
  };

  const isImageFile = (file: File) =>
    file.type.startsWith('image/');

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="text-xs"
      style={{
        border: isDragging ? '2px dashed #2956DD' : '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragging ? '#f0f8ff' : '#fff',
        transition: 'background-color 0.3s ease',
      }}
    >
      {
        uploadedFiles.length < 1 &&
        <p style={{ margin: 0 }}>
          Drop your files here or{' '}
          <label className="text-[#2956DD] cursor-pointer underline underline-offset-1">
            Update
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
        </p>
      }
      {uploadedFiles.length > 0 && (
        <div className='mt-4'>
          <h4 className='font-bold'>Uploaded Files:</h4>
          <div className='flex flex-wrap mt-4 gap-4 justify-start'>
            {uploadedFiles.map((file, index) => (
              <div className='flex flex-col justify-center items-center w-[45%] md:w-[30%] overflow-hidden max-h-[22vh]' key={file.name + index + "in file preview"}>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
                  {file.name}
                </div>
                {isImageFile(file) && (
                  <div className='rounded-md'>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className='h-[20vh] w-max rounded-md'
                    />
                  </div>
                )}
                {file?.type === 'application/pdf' && (
                  <div className="relative overflow-hidden w-full h-[20vh] rounded-md">
                    <iframe
                      src={URL.createObjectURL(file)}
                      title={`PDF Viewer ${index}`}
                      className="w-full h-full border-none"
                    />
                  </div>
                )}
                {!file?.type.startsWith('image/') && file?.type !== 'application/pdf' && (
                  <div className="relative overflow-hidden w-full h-[20vh] rounded-md">
                    <iframe
                      src={URL.createObjectURL(file)}
                      title={`TEXT Viewer ${index}`}
                      className="w-full h-full overflow-hidden border-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleClearFiles}
            className='mt-4 p-2 px-4 rounded-full cursor-pointer bg-secondaryColor text-white font-bold'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDropFileInput;
