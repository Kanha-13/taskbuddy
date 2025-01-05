import React from "react";

import { ReactComponent as ListIcon } from "../../assets/icons/list_icon.svg"
import { ReactComponent as BoardIcon } from "../../assets/icons/board_unselect.svg"
import { ReactComponent as LogOutIcon } from "../../assets/icons/logout_icon.svg"


interface ViewTogglerProps {
  activeTab: "list" | "board";
  setActiveTab: (tab: "list" | "board") => void;
}

const ViewToggler: React.FC<ViewTogglerProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mt-2 font-mulish justify-between items-center">
      <div className="flex mb-2">
        <div className={`flex font-semibold items-center border-b-2 ${activeTab === "list" ? "border-black" : "border-transparent"}`}>
          <ListIcon fill="red" className="items-center" style={{ fill: "red" }} />
          <button
            onClick={() => setActiveTab("list")}
            className={`p-2 px-2 ${activeTab == "list" ? "text-black" : "text-[#231F20] opacity-[82%]"}`}
          >
            List View
          </button>
        </div>
        <div className={`flex items-center font-semibold border-b-2 ${activeTab === "board" ? "border-black" : "border-transparent"}`}>
          <BoardIcon fill="black" />
          <button
            onClick={() => setActiveTab("board")}
            className={`p-2 px-2 ${activeTab == "board" ? "text-black" : "text-[#231F20] opacity-[82%]"}`}
          >
            Board View
          </button>
        </div>
      </div>
      <div className="cursor-pointer px-3 py-2 h-5/6 rounded-xl border-2 border-[#7B1984] border-opacity-15 bg-baseColor flex justify-evenly items-center">
        <LogOutIcon className="mr-2" />
        Logout
      </div>
    </div>
  );
};

export default ViewToggler;
