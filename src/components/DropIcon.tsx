import React from "react";

interface DropIconProps {
  isOpen: boolean;
  size: string;
  color: string;
}
const DropIcon: React.FC<DropIconProps> = ({ color = "text-[#979797]", isOpen, size = "w-6 h-6" }) => {
  return (
    <div className={`flex items-center justify-center ${color} rounded-full cursor-pointer`}>
      {
        isOpen ?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className={size}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg> :
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className={size}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
      }
    </div>
  );
}

export default DropIcon;