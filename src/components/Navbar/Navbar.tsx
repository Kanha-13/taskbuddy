import React from "react";
import userImg from "../../assets/images/user.svg"
import taskBlackIcon from "../../assets/icons/task_black.svg"

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { displayName = "Guest", photoURL = "" } = user || {};
  return (
    <nav className="bg-[#FAEEFC] p-3 px-4 shadow-md md:shadow-none md:p-0 md:bg-white font-mulish text-nav_title flex justify-between items-center">
      <div className="flex">
        <img className="hidden md:block" src={taskBlackIcon} />
        <p className="ml-1 outline-none text-2xl font-semibold">TaskBuddy</p>
      </div>
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full overflow-hidden" src={photoURL || userImg} />
        <div className="hidden md:block ml-2 text-[16px] font-bold opacity-60">{displayName?.split(" ")?.[0] || ''}</div>
      </div>
    </nav>
  );
};

export default Navbar;
