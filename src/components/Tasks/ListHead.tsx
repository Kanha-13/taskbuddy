import React from "react";
import DroperIcon from "../DropTriangle.tsx";

interface ListHeadProps {
  onSort: () => void;
}

const ListHead: React.FC<ListHeadProps> = ({ onSort }) => {
  return (
    <div className="items-center hidden md:flex p-2 px-4 font-bold font-mulish opacity-60">
      <div className="w-4/12">Task name</div>
      <div className="w-3/12 flex items-center justify-start">
        Due on
        <div onClick={onSort} className=" mr-auto cursor-pointer">
          <DroperIcon direction={true} color="#999999" height="6" />
          <DroperIcon direction={false} color="#999999" height="6" />
        </div>
      </div>
      <div className="w-3/12">Task Status</div>
      <div className="w-3/12">Task Category</div>
      <div className="w-16"></div>
    </div>
  );
}

export default ListHead;