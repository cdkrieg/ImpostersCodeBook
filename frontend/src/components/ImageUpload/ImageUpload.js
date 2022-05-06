import React, { useState, useEffect, useRef } from "react";

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsvalid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!props.file) {
      return;
    }
    const fileReader = new fileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.file);
  }, [props.file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      props.setFile(pickedFile);
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
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}></div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
