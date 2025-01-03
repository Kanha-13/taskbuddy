import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig.ts";
import { useNavigate } from "react-router-dom";
import Circle from "../components/Circle.tsx";
import googleIcon from "../assets/icons/google.svg"
import taskIcon from "../assets/icons/task.svg"
import loginIllustrator from "../assets/images/loginIllustrator.svg"

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/tasks");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex items-center h-full overflow-hidden justify-center min-h-screen bg-baseColor">
      <div className="flex w-[40%] h-[100%] justify-center items-center">
        <div className="flex flex-col w-3/5">
          <div className="flex">
            <img src={taskIcon} />
            <div className="text-secondaryColor font-custom font-bold text-2xl">TaskBuddy Google</div>
          </div>
          <div className="font-custom text-xs mt-2 ml-2">Streamline your workflow and track progress effortlessly with our all-in-one task management app.</div>
          <div className="flex cursor-pointer rounded-xl p-4 ml-2 mt-6 justify-center items-center bg-googleBtn">
            <img className="mr-4" src={googleIcon} />
            <div className="text-white text-xl font-bold font-custom">Continue with Google</div>
          </div>
        </div>
      </div>
      <div className="flex w-[60%] overflow-hidden h-screen ">
        <Circle />
        <div className="absolute  justify-center items-center flex w-[40%] h-[100%] right-0">
          <img className="w-full" src={loginIllustrator} />
        </div>
      </div>
    </div>
  );
};

export default Login;
