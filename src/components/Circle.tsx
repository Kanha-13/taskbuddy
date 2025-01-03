import React from "react";

interface CircleProps {
  height: string;
  width: string;
  color?: string; // Optional property to customize the color of the circle
}

const Circle: React.FC<CircleProps> = ({ size, color = "blue" }) => {
  return (
    <div class="relative flex items-center justify-center w-[100%] h-[120vh] -right-[5%] rounded-full border-2 border-[#7b19847d]">
      <div class="opacity-50 absolute w-[85%] h-[85%] rounded-full border-2 border-secondaryColor"></div>
      <div class="absolute w-[55%] h-[55%] rounded-full border-2 border-secondaryColor"></div>
    </div>
  )
};

export default Circle;
