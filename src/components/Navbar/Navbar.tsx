import React from "react";
import userImg from "../../assets/images/user.svg"
import taskBlackIcon from "../../assets/icons/task_black.svg"

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { displayName = "Guest", photoURL = "" } = user || {};
  return (
    <nav className="bg-white font-mulish text-nav_title flex justify-between items-center">
      <div className="flex">
        <img src={taskBlackIcon} />
        <p className="ml-1 outline-none text-2xl font-semibold">TaskBuddy</p>
      </div>
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full overflow-hidden" src={photoURL || userImg} />
        <div className="ml-2 text-[16px] font-bold opacity-60">{displayName?.split(" ")?.[0] || ''}</div>
      </div>
    </nav>
  );
};

export default Navbar;
