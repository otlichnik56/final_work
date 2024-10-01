/* import { createContext, useState, ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem("user");

    return userInfo ? JSON.parse(userInfo) : null;
  };

  const [userData, setUserData] = useState(getUserFromLocalStorage());

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  const setUser = (newUser) => {
    setUserData(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ userData, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; */




import { createContext, useState, ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
}

type UserContextData = {
  userData: string,
  logout: () => void, 
  setUser: (newUser: string) => void, 
}

export const UserContext = createContext<UserContextData | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem("user");

    return userInfo ? JSON.parse(userInfo) : null;
  };

  const [userData, setUserData] = useState(getUserFromLocalStorage());

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  const setUser = (newUser) => {
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
