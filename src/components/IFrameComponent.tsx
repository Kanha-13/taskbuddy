import React, { useRef, useEffect, memo } from 'react';

interface IFrameComponentProps {
  url: string;
}

const IFrameComponent: React.FC<IFrameComponentProps> = memo(({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.src !== url) {
      iframeRef.current.src = url;
    }
  }, [url]);

  return (
    <div className="relative overflow-hidden w-full h-[30vh] rounded-md">
      <iframe
        ref={iframeRef}
        className="w-full h-full max-h-[30vh] overflow-hidden rounded-md"
      />
    </div>
  );
});

export default IFrameComponent;
