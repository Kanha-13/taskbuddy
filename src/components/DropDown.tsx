import React, { useState } from "react";

interface DropdownProps {
  height?: string;
  width?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ height = "h-auto", width = "w-full", children }) => {

  return (
    <div className={`absolute right-[2%] mt-4 inline-block text-left ${width} ${height}`} >
      <div
        className="w-full absolute mt-2 bg-[#FFF9F9] border-2 border-[#EBD7E7] rounded-xl shadow-md z-10"
      >
        <ul className="py-1">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
