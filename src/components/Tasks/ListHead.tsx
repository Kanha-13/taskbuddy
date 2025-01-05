import React from "react";

const ListHead: React.FC = () => {
  return (
    <div className="border-t-2 border-opacity-10 border-black flex items-center p-2 px-4 font-bold font-mulish mt-8 opacity-60">
      <div className="w-4/12">Task name</div>
      <div className="w-3/12">Due on</div>
      <div className="w-3/12">Task Status</div>
      <div className="w-2/12">Task Category</div>
      <div className="w-16"></div>
    </div>
  );
}

export default ListHead;