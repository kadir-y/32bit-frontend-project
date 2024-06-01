import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext({});

const initialUser = {
  name: "Sophia",
  surname: "Powell",
  profilePicture: "https://randomuser.me/api/portraits/women/55.jpg"
}

export const AuthProvider = function ({ children }) {
  const setStoredToken = useLocalStorage("token")[1];
  const [user, setUser] = useState(initialUser);

  const isAuthenticated = Boolean(user.name);

  function logout() {
    setStoredToken("");
    setUser({});
  };
  function login(user, token) {
    setStoredToken(token);
    setUser(initialUser);
  };

  const data = {
    user,
    isAuthenticated,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = function () {
  return useContext(AuthContext);
}