import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userEmail, setUserEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserEmail(payload.fullName);
            setIsLoggedIn(true);
          } catch {
            localStorage.removeItem('token');
          }
        }
      }, []);

      const login = (token) => {
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(payload.fullName);
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        localStorage.removeItem('token');
      
        setUserEmail(null);
        setIsLoggedIn(false);
      };
      return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}
export const useAuth = () => useContext(AuthContext);
