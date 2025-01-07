import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Circle from "../components/Circle.tsx";
import googleIcon from "../assets/icons/google.svg";
import taskIcon from "../assets/icons/task.svg";
import loginIllustrator from "../assets/images/loginIllustrator.svg";
import { ReactComponent as CircleBg } from "../assets/images/circles_bg.svg";
import { useAuth } from "../features/auth/useAuth.ts";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, status, loginWithGoogle, checkUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="flex items-center h-screen w-screen overflow-hidden justify-center bg-baseColor">
      <div className="flex w-screen overflow-hidden md:w-[40%] h-screen justify-center items-center">
        <div className="flex flex-col w-[95%] items-center md:items-stretch md:w-3/5">
          <div className="flex">
            <img src={taskIcon} />
            <div className="text-secondaryColor font-custom font-bold text-[1.65rem]">TaskBuddy</div>
          </div>
          <div className="font-custom text-center w-max md:text-left text-xs mt-2 ml-2">
            Streamline your workflow and track progress effortlessly <br />
            with our all-in-one task management app.
          </div>
          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer rounded-3xl md:rounded-2xl p-4 px-10 xl:px-16 ml-2 w-max mt-6 justify-center items-center bg-googleBtn"
          >
            <img className="mr-4" src={googleIcon} />
            <div className="text-white text-xl font-bold font-custom">Continue with Google</div>
          </div>
        </div>
        <div className="absolute pointer-events-none h-screen w-screen overflow-hidden">
          <CircleBg className="object-cover w-48 h-48 md:hidden absolute -top-20 -right-24" />
          <CircleBg className="object-cover w-48 h-48 md:hidden absolute top-48 -left-[7rem]" />
          <CircleBg className="object-cover w-48 h-48 md:hidden absolute bottom-28 left-1/2 transform -translate-x-1/2" />
        </div>
      </div>

      <div className="hidden md:flex w-[60%] overflow-hidden h-screen">
        <div className="pointer-events-none h-screen w-screen overflow-hidden">
          <CircleBg className="w-[110%] h-[110%] mt-5 ml-[6vw] xl:ml-[4vw]" />
        </div>
        <div className="absolute justify-center items-center flex w-[40%] h-screen right-0 overflow-hidden">
          <img className="w-full h-full" src={loginIllustrator} />
        </div>
      </div>
    </div>
  );
};

export default Login;
