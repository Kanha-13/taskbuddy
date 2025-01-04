import React from "react";

const ListHead: React.FC = () => {
  return (
    <div className="border-t-2 border-opacity-10 border-black flex justify-between p-2 px-4 font-bold font-mulish mt-8 opacity-60">
      <div>Task name</div>
      <div>Due on</div>
      <div>Task Status</div>
      <div>Task Category</div>
      <div></div>
    </div>
  );
}

export default ListHead;