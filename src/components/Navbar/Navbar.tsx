// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/tasks" className="text-lg font-bold">
        Task Manager
      </Link>
      <button onClick={handleLogout} className="bg-red-500 py-1 px-3 rounded-lg">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
