import React from "react";

interface DropIconProps {
  isOpen: true | false;
}
const DropIcon: React.FC<DropIconProps> = ({ isOpen }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 text-[#3E0344] rounded-full cursor-pointer">
      {
        isOpen ?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg> :
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
      }
    </div>
  );
}

export default DropIcon;