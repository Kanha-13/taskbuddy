import React, { useEffect, useState } from "react";

interface DropdownProps {
  height?: string;
  width?: string;
  position?: string;
  bgColor?: string;
  border?: string;
  children: React.ReactNode;
  scrollTo?: number;
}

const Dropdown: React.FC<DropdownProps> = ({ scrollTo , bgColor = "bg-[#FFF9F9]", border = "border-2 border-[#EBD7E7]", height = "h-auto", width = "w-full", position = "top-full left-0", children }) => {
  const [isScrolledOnce, setIsScrolled] = useState(false);
  useEffect(() => {
    if (!isScrolledOnce && scrollTo) {
      setIsScrolled(true)
      const element = document.getElementById("drop" + children?.[0])
      element?.scrollBy({ top: scrollTo - element?.getBoundingClientRect().y - 10 })
    }
  }, [scrollTo, isScrolledOnce])

  return (
    <div id={"drop" + children?.[0]} className={`${bgColor} ${border} rounded-xl shadow-md absolute ${position} font-mulish p-2 overflow-y-auto mt-2 z-50 ${width} ${height}`} >
      <ul className="py-1">
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
