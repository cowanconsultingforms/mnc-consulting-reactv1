import {ref as reference,uploadBytesResumable,getDownloadURL,
} from "firebase/storage";
import React, {useState,useRef,forwardRef,useEffect } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../firebase";

export const FileUploader = ({onChange}) => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const handleChange= (event)=> {
    setFile(event.target.files[0]);
}
const handleUpload = () => {
  if (!file) {
      alert("Please upload an image first!");
  }

  const storageRef = reference(storage, `/pictures/${file.name}`);

  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setFile(url);
          });
      }
  );
};
    return (
      <div className="uploader">
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload Picture</button>
      <p>{percent} "% done"</p>
      </div>
    );
}
export default FileUploader;