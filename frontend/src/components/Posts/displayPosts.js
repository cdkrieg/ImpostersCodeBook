import React from "react";

const DisplayPosts = ({postList}) => {
    return ( 
        <div>
            {postList.map((post) => {
                return ( 
                    <div>{post.body}</div>
                )
            })}
     </div>
     );
}
 
export default DisplayPosts;