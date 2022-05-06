import { createContext, useEffect, useState } from "react";

import AxiosOnlineStatus from "../Routes/status";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3007/api/users";
  const decodedUser = localStorage.getItem("token");
  const decodedToken = decodedUser ? jwtDecode(decodedUser) : null;
  const [user, setUser] = useState(() => decodedToken);
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      AxiosOnlineStatus.online(user._id);
    }
  }, [user]);

  const registerUser = async (registerData) => {
    try {
      let response = await axios.post(`${BASE_URL}/register`, registerData);
      if (response.status === 200) {
        let token = response.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        console.log(token);
        setUser(jwtDecode(token));
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setUser(jwtDecode(response.data));
        console.log(jwtDecode(response.data));
        setIsServerError(false);
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
      setIsServerError(true);
    }
  };

  const logoutUser = async () => {
    if (user) {
      try {
        await AxiosOnlineStatus.offline(user._id);
      } catch (error) {
        console.log("Error changing offline status: " + error);
      }
      navigate("/");
      localStorage.removeItem("token");
      console.log("token removed");
      setUser(null);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
