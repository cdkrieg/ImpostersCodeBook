import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";


const HomePage = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container-0">Home Page for {user.name}!</h1>;
};

export default HomePage;
