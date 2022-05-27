import { getDownloadURL, getStorage, storageRef } from 'firebase/storage';
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db } from "../../firebase";
import { Timestamp,addDoc} from 'firebase/firestore';
import { FlexboxGrid,Uploader } from 'rsuite';
const storage = getStorage(firebaseApp);
import {
  StorageError,
  StorageReference,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useMemo } from "react";



const UploadFile = () => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const ref = storageRef(storage, 'file.jpg');
  const [selectedFile, setSelectedFile] = useState<File>(ref);

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(ref, selectedFile, {
        contentType: 'image/jpeg'
      }).then((snapshot) => 
        getDownloadURL(snapshot.ref).then((url) => {
             return (
      <React.Fragment>
        <div>
        <img src={url} alt="file"/>
        </div>
      </React.Fragment>
    )
      }));
      alert(`Result: ${JSON.stringify(result)}`);
    }
 
  }

  return (
    <React.Fragment>
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
        <button onClick={upload} type="save" >Upload file</button>
      </p>
    </React.Fragment>
  )
}

export const AddListing = () => {
    
    const [collection, loading, error] = useCollection(db, "listings");
  return (
    <React.Fragment>
      <FlexboxGrid>
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
      </FlexboxGrid>
    </React.Fragment>
  );
}

export const NewListing = () => {
  

  return
  (
    <div>
    
    </div>

  )
}

const listingStyles = [{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  margin: '15%',
  border: '1px solid black',
  borderRadius: '5px',
  

}]
export default AddListing;