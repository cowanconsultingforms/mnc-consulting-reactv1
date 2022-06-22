import {
  getStorage,
  ref as reference,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, {useState,useRef,forwardRef,useEffect } from "react";
import { storage } from "../../firebase";
import { Uploader } from 'rsuite';
import { useUploadFile } from "react-firebase-hooks/storage";

export const FileUploader = ({ action, ref, listType, defaultFileList }) => {
  const storageRef = reference(storage, "images/" + uploadFile);
  const fileList = [];
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const [selectedFile, setSelectedFile] = useState<File>(null);
  const [files, setFiles] = useState('');
  const uploadRef = useRef();
  const upload = async (e) => {
    e.preventDefault();
      const result = await uploadFile(storageRef,files, {
        contentType: "image/jpeg",
      });
        alert(`Result: ${JSON.stringify(result)}`);
    return (
      <div>
        <p>
          {error && <strong>Error: {error.message}</strong>}
          {uploading && <span>Uploading file...</span>}
          {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
          {selectedFile && <span>Selected file: {selectedFile.name}</span>}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              setSelectedFile(file);
            }}
          />
          <button onClick={upload}>Upload file</button>
        </p>
      </div>
    );
    };
  const RenderFileInfo = () => {
    return (
      <React.Fragment>
        {fileList.map((file) => {
          return (
            <div key={file.name}>
              <span>{file.name}</span>
              <span>{file.size}</span>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  const handleUpload = async (e, file) => {
    e.preventDefault();
    const storageRef = reference(storage, "images/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          return downloadURL.toString();
        });
      }
    );
  };
  useEffect(()=> {
  
  },[fileList])
    return (
      <div className="uploader">
        <Uploader
          action={upload}
          listType="picture-text"
          defaultFileList={fileList}
          ref={uploadRef}
          onUpload={file=>uploadFile(reference(storage,'listingImages/'+file.name))}
          renderFileInfo={RenderFileInfo()}
        />
      </div>
    );
}
export default FileUploader;