import React, { useState } from "react";

interface DropdownProps {
  height?: string;
  width?: string;
  position?:string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ height = "h-auto", width = "w-full", position="top-full left-0", children }) => {

  return (
    <div className={`bg-[#FFF9F9] border-2 border-[#EBD7E7] rounded-xl shadow-md absolute ${position} font-mulish p-2 overflow-y-auto mt-2 z-50 ${width} ${height}`} >
        <ul className="py-1">
          {children}
        </ul>
    </div>
  );
};

export default Dropdown;
