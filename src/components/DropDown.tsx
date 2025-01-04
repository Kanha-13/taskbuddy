import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (selected: string) => void;
  height?: string;
  width?: string;
  images: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ images, options, onSelect, height = "h-auto", width = "w-full" }) => {

  const handleSelect = (option: string) => {
    onSelect(option);
  };

  return (
    <div className={`absolute right-[2%] mt-4 inline-block text-left ${width} ${height}`} >
      <div
        className="w-full absolute mt-2 bg-[#FFF9F9] border-2 border-[#EBD7E7] rounded-md shadow-md z-10"
      >
        <ul className="py-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-[#FCEBF2] cursor-pointer"
            >
              <img className="mr-4" src={images[index]} />
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
