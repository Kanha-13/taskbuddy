import React from "react";

const Ellipses: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 justify-center h-full w-full">
      <div className="w-1 h-1 bg-black rounded-full"></div>
      <div className="w-1 h-1 bg-black rounded-full"></div>
      <div className="w-1 h-1 bg-black rounded-full"></div>
    </div>
  );
}
export default Ellipses;