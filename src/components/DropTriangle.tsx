import React from "react"

interface DroperIconProps {
  direction: boolean;
  color: string;
  height?: string;
}

const DroperIcon: React.FC<DroperIconProps> = ({ direction = false, color = "#F8B1FF", height = "10" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 150" width="10" height={height} className="ml-2">
      {direction ? (
        <polygon points="50,0 100,100 0,100" fill={color} />
      ) : (
        <polygon points="50,100 100,0 0,0" fill={color} />
      )}
    </svg>
  );
};

export default DroperIcon;