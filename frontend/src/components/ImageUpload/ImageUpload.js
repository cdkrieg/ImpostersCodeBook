import React, { useState,  useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";

const ImageUpload = () => {
  const [newImage, setNewImage] = useState({image: ''});

  const {user} = useContext(AuthContext)
  const handlePhoto = (event) => {
    setNewImage({ image: event.target.files[0]})
  }
 
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('image', newImage.image)
    updateImage(formData)
  }

  async function updateImage(formData){
    let response = await AxiosUsers.updateImage(user._id, formData)
    if(response)
    console.log(response)
  }

   return (
    <form onSubmit={handleSubmit} encType='multipart/form-data' >
      <input type='file' accept=".png,.jpg,.jpeg"
      name="image"
      onChange={handlePhoto}
      />
      <div className="bg"> </div>
      <input type="submit" />
    </form>
   )
   }
export default ImageUpload;
