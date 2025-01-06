import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { loginUser, logoutUser, setUser } from './authSlice.ts';
import { loginFirebase, logoutFirebase } from '../../firebaseConfig.ts';

interface UseAuthReturn {
  user: any;
  status: string;
  loginWithGoogle: () => void;
  logout: () => void;
  checkUser: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    const user = await loginFirebase()
    dispatch(loginUser(user));
  };

  const handleLogout = async () => {
    await logoutFirebase()
    dispatch(logoutUser());
  };

  const checkUser = async () => {
    let user = localStorage.getItem("taskBuddyuser");
    if (user) user = JSON.parse(user)
    dispatch(setUser(user))
  }

  return {
    user,
    status,
    checkUser,
    loginWithGoogle: handleLogin,
    logout: handleLogout,
  };
};
