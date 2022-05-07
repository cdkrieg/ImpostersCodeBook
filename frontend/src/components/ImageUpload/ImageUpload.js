import React, { useState, useEffect, useRef,  useContext } from "react";
import AuthContext from "../../context/AuthContext";

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsvalid] = useState(false);
  const filePickerRef = useRef();
  const {user, file, setFile} = useContext(AuthContext)

   useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    console.log(file)
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files.file[0];
      console.log(pickedFile)
      setFile(pickedFile);
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  };

  const pickImagehandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className='form-control'>
      <input
        ref={filePickerRef}
        style={{ display: "none" }}
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={pickedHandler}
      />
      <div className={`image-upload`}></div>
      {!isValid && <p>Invalid image selected</p>}
    </div>
  );
};

export default ImageUpload;
