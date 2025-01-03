import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.ts";
import userImg from "../../assets/images/user.svg"
import taskBlackIcon from "../../assets/icons/task_black.svg"
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <nav className="bg-white font-mulish text-nav_title flex justify-between items-center">
      <div className="flex">
        <img src={taskBlackIcon} />
        <Link to="/tasks" className="ml-1 text-2xl font-semibold">TaskBuddy</Link>
      </div>
      <div className="flex items-center">
        <img src={userImg} />
        <div className="ml-2 text-[16px] font-bold opacity-60">Arvind</div>
      </div>
    </nav>
  );
};

export default Navbar;
