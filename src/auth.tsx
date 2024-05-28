import React, { useContext } from "react";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useCookie from "react-use-cookie";

interface AuthContextType {
  user: string;
  login: (password: string, callback: VoidFunction) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useCookie("user", "");

  const login = (password: string, callback: VoidFunction) => {
    const passwordObj = JSON.parse(import.meta.env.VITE_APP_PASSWORDS);
    const username = passwordObj[password];
    if (username) {
      setUser(username);
      callback();
    } else {
      console.log("Invalid Password");
    }
  };

  const logout = () => {
    setUser("");
    navigate("/", { replace: true });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const PrivateRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const useAuth = () => useContext(AuthContext);
