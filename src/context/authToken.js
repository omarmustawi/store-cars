"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

export const AuthTokenContext = createContext();

export const AuthTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const cookie = new Cookies();
  const router = useRouter();
  const logout = () => {
    cookie.remove("token");
    cookie.remove("name");
    setToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthTokenContext.Provider
      value={{
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthTokenContext);
}
