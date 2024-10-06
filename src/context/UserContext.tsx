import { createContext, useState, ReactNode } from "react";
import { UserType } from "../types/user";

type UserProviderProps = {
  children: ReactNode;
}

type UserContextData = {
  userData: UserType | null;
  logout: () => void;
  setUser: (newUser: UserType) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {

  // Получаем пользователя из localStorage
  const getUserFromLocalStorage = (): UserType | null => {
    const userInfo = localStorage.getItem("user");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  const [userData, setUserData] = useState<UserType | null>(getUserFromLocalStorage());

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  const setUser = (newUser: UserType) => {
    setUserData(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ userData, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
