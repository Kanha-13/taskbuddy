import React, { useEffect, useState } from 'react';
import { fetchFileFromSupabase } from '../utils/fileUpload.ts';

interface RenderFileProps {
  files: (string | undefined)[] | undefined;
  onDelete: (file: string) => void;
}

interface BlobFileType {
  blob: Blob | null;
  dbURL: string;
}

const FileViewer: React.FC<RenderFileProps> = ({ files = [], onDelete }) => {
  const [blobs, setBlobs] = useState<(BlobFileType | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    if (loading) return; // Avoid duplicate calls

    try {
      setLoading(true);

      const filesData = await Promise.all(
        files.map(async (file) => {
          if (!file) return null;

          const filename = file.split(' + "<<-@separator@->>" + ')[1];
          if (!filename) return null;

          return {
            blob: await fetchFileFromSupabase(filename),
            dbURL: file,
          };
        })
      );

      setBlobs(filesData.filter((item) => item !== null));
    } catch (error) {
      console.error('Error fetching files:', error);
      setBlobs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (index: number) => {
    try {
      const filename = blobs[index]?.dbURL;
      if (!filename) return;

      await onDelete(filename);
      setBlobs((prevBlobs) => prevBlobs.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDeleteFile = (index: number) => {
    if (window.confirm("Are you sure you want to delete file " + `${blobs[index]?.dbURL.split(' + "<<-@separator@->>" + ')?.[0]}?`)) {
      deleteFile(index);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [files]);

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (!blobs.length) {
    return <div>No files available.</div>;
  }

  return (
    <div className="w-full h-auto flex flex-wrap gap-4 justify-start">
      {blobs.map((blob, index) => {
        if (!blob) return null;

        const url = URL.createObjectURL(blob.blob || new Blob);

        return (
          <div key={blob.dbURL + index + "in file-viewer"} className="bg-gray-100 flex flex-col justify-between w-[30%] h-[38vh] rounded-md relative">
            <button
              onClick={() => handleDeleteFile(index)}
              className="absolute -top-2 -right-2 z-50 text-[#121212] border border-black bg-[#FAFAFA] border-opacity-15 w-7 h-7 rounded-full"
              aria-label="Delete file"
            >
              ✖
            </button>

            {/* Displaying different file types */}
            {blob?.blob?.type.startsWith('image/') && (
              <img src={url} alt={`Fetched file ${index}`} className="w-full object-cover rounded-md max-h-[29vh]" />
            )}
            {blob?.blob?.type === 'application/pdf' && (
              <div className="relative overflow-hidden w-full h-[30vh] rounded-md">
                <iframe
                  src={url}
                  title={`PDF Viewer ${index}`}
                  className='w-full h-full max-h-[30vh] overflow-hidden rounded-md'
                />
              </div>
            )}
            {!blob?.blob?.type.startsWith('image/') && blob?.blob?.type !== 'application/pdf' && (
              <div className="relative overflow-hidden w-full h-[30vh] rounded-md">
                <iframe
                  src={url}
                  title={`TEXT Viewer ${index}`}
                  className='w-full h-full max-h-[30vh] overflow-hidden rounded-md'
                />
              </div>
            )}

            {/* Download Link */}
            <div className="mt-2 w-full p-2">
              <a href={url} download={`file-${index}`} className="text-blue-500 underline h-full w-full">
                Download File "{blob.dbURL.split(' + "<<-@separator@->>" + ')?.[0].slice(0,10)}.."
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileViewer;
