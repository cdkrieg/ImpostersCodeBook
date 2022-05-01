
const Projects = ({user}) => {
    
    return ( 
        <div className='projects'>
            <h3>PROJECTS</h3>
            <br/>
            <ul>
                {user.projects.map((project, index) => {
                    return (
                    <div key={index}>
                        <li>{project}</li>
                    </div>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default Projects;
