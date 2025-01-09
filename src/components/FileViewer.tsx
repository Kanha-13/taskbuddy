import React, { useEffect, useState } from 'react';
import { fetchFileFromSupabase } from '../utils/fileUpload.ts';
import RenderFile from './RenderFile.tsx';

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
      {blobs.map((blob, index) => <RenderFile key={blob?.dbURL + "in-render-file-component"} blob={blob} index={index} onDelete={deleteFile} />)}
    </div>
  );
};

export default FileViewer;
