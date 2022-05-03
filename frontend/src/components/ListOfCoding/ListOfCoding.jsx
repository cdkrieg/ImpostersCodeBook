import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";

const ListOfCoding = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h3>LIST OF CODING LANGUAGES or CERTS</h3>
      {console.log(user)}
      <ul>
        {user &&
          user.codingLanguages.map((language, index) => {
            console.log(language);
            return (
              <div key={index}>
                <li><h5>{language}</h5></li>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default ListOfCoding;
