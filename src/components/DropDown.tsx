import React, { useState } from "react";

interface DropdownProps {
  height?: string;
  width?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ height = "h-auto", width = "w-full", children }) => {

  return (
    // <div className={`bg-[#FFF9F9] border-2 border-[#EBD7E7] rounded-xl shadow-md z-10 absolute right-[2%] top-full overflow-y-auto mt-6 inline-block text-left ${width} ${height}`} >
    <div className={`bg-[#FFF9F9] border-2 border-[#EBD7E7] rounded-xl shadow-md absolute top-full left-0 font-mulish p-2 overflow-y-auto mt-2 z-50 ${width} ${height}`} >
        <ul className="py-1">
          {children}
        </ul>
    </div>
  );
};

export default Dropdown;
