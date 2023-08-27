import React from "react";
// import { BsNewspaper } from "react-icons/bs";
import DropFileInput from '../components/drop-file-input/DropFileInput';
function Upload(){

  const onFileChange = (files) => {
      console.log(files);
  }

  return (
      <div className="about">
          <h4 className="header">
              drop files input
          </h4>
          <DropFileInput
              onFileChange={(files) => onFileChange(files)}
          />
      </div>
  );
}

export default Upload;