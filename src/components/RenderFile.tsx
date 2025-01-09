import React, { useMemo } from "react";
import IFrameComponent from "./IFrameComponent.tsx";

interface BlobFileType {
  blob: Blob | null;
  dbURL: string;
}

interface RenderFileProps {
  blob: BlobFileType | null;
  index: number;
  onDelete: (index: number) => void;
}

const RenderFile: React.FC<RenderFileProps> = ({ blob, index, onDelete }) => {
  const handleDeleteFile = (index: number) => {
    if (window.confirm("Are you sure you want to delete file " + `${blob?.dbURL.split(' + "<<-@separator@->>" + ')?.[0]}?`)) {
      onDelete(index);
    }
  };

  const stableUrl = useMemo(() => {
    if (!blob?.blob) return '';
    return URL.createObjectURL(blob.blob);
  }, [blob?.blob]);
  
  
  if (!blob) return null;
  return (
    <div key={blob.dbURL + index + "in file-viewer"} className="bg-gray-100 flex flex-col justify-between w-[45%] md:w-[30%] h-[38vh] rounded-md relative">
      <button
        onClick={() => handleDeleteFile(index)}
        className="absolute -top-2 -right-2 z-50 text-[#121212] border border-black bg-[#FAFAFA] border-opacity-15 w-7 h-7 rounded-full"
        aria-label="Delete file"
      >
        ✖
      </button>

      {blob?.blob?.type.startsWith('image/') && (
        <img src={stableUrl} alt={`Fetched file ${index}`} className="w-full object-cover rounded-md max-h-[29vh]" />
      )}
      {!blob?.blob?.type.startsWith('image/') && <IFrameComponent url={stableUrl} />}

      <div className="mt-2 w-full p-2">
        <a href={stableUrl} download={`${blob.dbURL.split(' + "<<-@separator@->>" + ')?.[0]}`} className="text-blue-500 underline h-full w-full">
          Download File "{blob.dbURL.split(' + "<<-@separator@->>" + ')?.[0].slice(0, 10)}.."
        </a>
      </div>
    </div>
  );
}

export default RenderFile;