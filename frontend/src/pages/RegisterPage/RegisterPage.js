import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const RegisterPage = () => {
  const { registerUser, user, file, setFile } = useContext(AuthContext);
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    image: null,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className='container-0'>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type='text'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            width: "20%",
          }}>
          Admin:{" "}
          <input
            type='checkbox'
            name='isAdmin'
            checked={formData.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            width: "80%",
          }}>
          Profile Picture:{" "}
          <input type='file' name='image' onChange={(event)=>{setFile(event.target.value)}} />
        </label>
        <button>Register!</button>
      </form>
      {!user || !user.image ? (
        <ImageUpload file={file} setFile={setFile} />
      ) : (
        <button>
          <img src={`http://localhost:3007/${user.image}`} alt='' />
        </button>
      )}
    </div>
  );
};

export default RegisterPage;
