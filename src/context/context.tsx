import { createContext, useContext, useEffect, useState } from "react";
import { ApiInstance } from "../config/Api";

type AuthContextType = {
  login: boolean;
  user: any;
  authInitialized: boolean;
  loginHandler: () => Promise<void>;
  logout: () => void;
  setLogin?: any;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  const loginHandler = async () => {
    try {
      const response = await ApiInstance.get("user");
      setUser(response.data?.profile);
      setLogin(true);
    } catch (err) {
      console.log("Error in loginHandler:", err);
      setLogin(false);
      setUser(null);
    }
  };

  const logout = () => {
    setLogin(false);
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await loginHandler();
      setAuthInitialized(true);
    };
    
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        login,
        setLogin,
        user, 
        authInitialized,
        loginHandler, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};