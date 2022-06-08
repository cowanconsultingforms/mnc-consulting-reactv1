import React, { useState, useEffect } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
const UploadFile = () => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, "file.jpg");
  const [selectedFile, setSelectedFile] = useState < File > ref;

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(ref, selectedFile, {
        contentType: "image/jpeg",
      }).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          return (
            <React.Fragment>
              <div>
                <img src={url} alt="file" />
              </div>
            </React.Fragment>
          );
        })
      );
      alert(`Result: ${JSON.stringify(result)}`);
    }
  };

  return (
    <React.Fragment>
      <p>
        {error && <strong>Error: {error.message}</strong>}
        {uploading && (
          <span>
            {" "}
            <Uploader
              listType="picture-text"
              defaultFileList={fileList}
              action="//jsonplaceholder.typicode.com/posts/"
              renderFileInfo={(file, fileElement) => {
                return (
                  <div>
                    <span>File Name: {file.name}</span>
                    <p>File URL: {file.url}</p>
                  </div>
                );
              }}
            />
          </span>
        )}
        {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
        />
        <button onClick={upload} type="save">
          Upload file
        </button>
      </p>
    </React.Fragment>
  );
};