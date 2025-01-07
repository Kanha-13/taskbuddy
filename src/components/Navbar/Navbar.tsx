import React, { useState } from "react";
import userImg from "../../assets/images/user.svg"
import taskBlackIcon from "../../assets/icons/task_black.svg"
import { ReactComponent as LogOutIcon } from "../../assets/icons/logout_icon.svg"

import Dropdown from "../DropDown.tsx";

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const { displayName = "Guest", photoURL = "" } = user || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openLogout = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav className="bg-[#FAEEFC] p-3 px-4 shadow-md md:shadow-none md:p-0 md:bg-white font-mulish text-nav_title flex justify-between items-center">
      <div className="flex">
        <img className="hidden md:block" src={taskBlackIcon} />
        <p className="ml-1 outline-none text-base md:text-2xl font-semibold">TaskBuddy</p>
      </div>
      <div className="flex items-center relative">
        <img onClick={openLogout} className="w-10 h-10 rounded-full overflow-hidden" src={photoURL || userImg} />
        <div className="hidden md:block ml-2 text-[16px] font-bold opacity-60">{displayName?.split(" ")?.[0] || ''}</div>
        {
          isOpen ? <Dropdown height="h-auto" width="w-max" position="md:hidden top-full right-0" >
            <div onClick={onLogout} className="cursor-pointer font-semibold text-sm px-3 py-2 h-5/6 rounded-xl bg-baseColor flex justify-evenly items-center">
              <LogOutIcon className="mr-2" />
              Logout
            </div>
          </Dropdown> : <></>
        }
      </div>
    </nav>
  );
};

export default Navbar;
