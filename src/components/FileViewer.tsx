import React, { useEffect, useState } from 'react';
import { fetchFileFromSupabase } from '../utils/fileUpload.ts';

interface RenderFileProps {
  files: (string | undefined)[] | undefined;
}

const FileViewer: React.FC<RenderFileProps> = ({ files = [] }) => {
  const [blobs, setBlobs] = useState<(Blob | null)[]>([]); // Initialize with an empty array for clarity
  const [loading, setLoading] = useState(false); // Add a loading state for better UX

  const fetchFiles = async () => {
    if (!loading)
      try {
        setLoading(true); // Start loading
        const filesData = await Promise.all(
          files.map(async (file) => {
            if (!file) return null; // Skip undefined entries
            const filename = file.split(' + "<<-@separator@->>" + ')[1];
            if (!filename) return null; // Handle invalid file strings
            return await fetchFileFromSupabase(filename);
          })
        );
        setBlobs(filesData);
      } catch (err) {
        console.error('Error fetching files:', err);
        setBlobs([]); // Clear blobs on error
      } finally {
        setLoading(false); // End loading
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
    <div className='w-full h-auto flex flex-wrap gap-4 justify-between'>
      {blobs.map((blob, index) => {
        if (!blob) return null; // Skip null blobs
        const url = URL.createObjectURL(blob);

        // Render based on file type
        if (blob.type.startsWith('image/')) {
          return (
            <div key={index} className='w-[30%] h-auto rounded-md overflow-hidden'>
              <img
                src={url}
                alt={`Fetched file ${index}`}
              />
            </div>
          );
        } else if (blob.type === 'application/pdf') {
          return (
            <div key={index} style={{ marginBottom: '10px' }}>
              <iframe
                src={url}
                title={`PDF Viewer ${index}`}
                style={{ width: '100%', height: '500px' }}
              />
            </div>
          );
        } else {
          return (
            <div key={index} style={{ marginBottom: '10px' }}>
              <a href={url} download={`file-${index}`}>
                Download File {index + 1}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FileViewer;
