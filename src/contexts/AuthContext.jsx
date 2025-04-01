import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createUser } from "../services/backend_api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage?.getItem("token");
    const storedUsername = localStorage?.getItem("username");
    const storedUserID = localStorage?.getItem("id")

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const tokenExp = decodedToken.exp;
      const currentDate = Date.now() / 1000;

      if (tokenExp < currentDate) {
        setToken(null);
        setUsername(null);
        setUserID(null)
      } else {
        setToken(storedToken);
        setUsername(storedUsername);
        setUserID(storedUserID)
      }
    }

    setIsAuthLoaded(true)
  }, []);

  const authenticateUser = async (data) => {
    try {
      const res = await loginUser(data);
      if (res) {
        setUsername(res.username);
        setToken(res.token);
        setUserID(res.id)
      }
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    setUsername(null);
    setToken(null);
    setUserID(null)
    localStorage.clear();
    navigate("/");
  };

  const registerUser = async (data) => {
    localStorage.clear();

    try {
      const res = await createUser(data);
      if (res) {
        const userData = {
          authentication: {
            email: data.email,
            password: data.password,
          },
        };

        authenticateUser(userData);
      }
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = () => {
    if (!username) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (username && token && userID) {
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("id", userID)
    }
  }, [username, token, userID]);

  return (
    <AuthContext.Provider
      value={{
        username,
        userID,
        token,
        authenticateUser,
        logoutUser,
        registerUser,
        isAuthenticated,
        isAuthLoaded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
