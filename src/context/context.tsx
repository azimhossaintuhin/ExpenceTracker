import { createContext, useContext, useEffect, useState } from "react";
import { ApiInstance } from "../config/Api";

export const AuthContext = createContext<any>("");

export const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState<boolean>(false);
    const [user, setUser] = useState<any>("");


    const loginHandler = async () => {
        try {
            
            const response = await ApiInstance.get("user");
            setUser(response.data?.profile);
        
            setLogin(true);
        } catch (err) {
            console.log("Error in loginHandler:", err);
           
            setLogin(false); 
            
        }
    };

    useEffect(() => {
        loginHandler();  
    }, []);

    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser}}>
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
