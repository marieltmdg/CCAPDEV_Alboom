import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext({
  authState: {
    authenticated: false,
    user: null,
    type: null,
  },
  setAuthState: () => {},
});


export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    user: null,
    type: null,
  });

  useEffect(() => {
    console.log("Auth State Updated:", authState);
  }, [authState]); // Logs whenever authState changes

  const checkAuthStatus = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/user/status`, {
        withCredentials: true
      });
      const api = axios.create({
        baseURL: apiBaseUrl,
        withCredentials: true,
      });
      setAuthState({
        authenticated: response.data.authenticated,
        user: response.data.user,
        type: response.data.type,
      });
      return authState;
    } catch (err) {
      setAuthState({
        authenticated: false,
        user: null,
        type: null,
      });
      return authState;
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this custom hook export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};