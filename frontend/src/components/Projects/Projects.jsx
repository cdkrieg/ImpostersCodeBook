import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";

const Projects = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
      <h3>PROJECTS</h3>
      <ErrorBoundary>
        <ul>
          {user && user.projects.map((project, index) => {
            
            return (
              <div key={index}>
                <li><h6>{project}</h6></li>
              </div>
            );
          })}
        </ul>
      </ErrorBoundary>
    </div>
  );
};

export default Projects;
