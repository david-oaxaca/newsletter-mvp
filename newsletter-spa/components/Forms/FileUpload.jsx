import React, { useState } from "react";
import UploadButton from "../Buttons/UploadButton";

const FileUpload = ({ onFileUploaded }) => {
  const [fileName, getFileName] = useState("");
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    getFileName(fileUploaded.name);
    //onFileUploaded(fileUploaded);
  };

  return (
    <div className="file-upload">
      <div className="intruction-label">
        <span className="input-label text--big">
          Select a file (.pdf or png):
        </span>
      </div>
      <UploadButton onClick={handleClick}>Select a file </UploadButton>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} />
      <label className="text--big">
        {fileName === "" ? null : `Selected file: ${fileName}`}
      </label>
    </div>
  );
};

export default FileUpload;
