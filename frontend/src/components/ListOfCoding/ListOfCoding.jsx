
const ListOfCoding = ({user}) => {
    
    return ( 
        <div className='container'>
            <h3>LIST OF CODING LANGUAGES or CERTS</h3>
            <br/>
            <ul>
                {user.listOfCoding.map((list, index) => {
                    return (
                    <div key={index}>
                        <li>{list}</li>
                    </div>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default ListOfCoding;