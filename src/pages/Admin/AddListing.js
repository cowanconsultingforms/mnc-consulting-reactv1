import { getDownloadURL,  ref } from 'firebase/storage';
import React, { useState,useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db } from "../../firebase";
import { Timestamp,addDoc} from 'firebase/firestore';
import { Container, FlexboxGrid,Uploader,DOMHelper,Schema } from 'rsuite';
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
import { map } from '@firebase/util';

const model = Schema.Model({
  type: StringType().isRequired("This field is required."),
  street: StringType()
    .isRequired("This field is required."),
  city: StringType().isRequired("This field is required."),
  state: StringType()
    .isRequired("This field is required."),
  zip: StringType().isRequired("This field is required."),
  bedrooms: StringType().isRequired("This field is required."),
  bathrooms: StringType().isRequired("This field is required."),
  price: StringType().isRequired("This field is required."),
  description: StringType().isRequired("This field is required."),

});

const UploadFile = () => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, 'file.jpg');
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
}

export const AddListing = () => {
    
  const [formValue, setFormValue] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  })
  const [formError, setFormError] = useState({});
  return (
    <Container className="add-listing" style={{ display: 'flex',flexDirection:'column'}}>
      <FlexboxGrid>

      </FlexboxGrid>
    </Container>
  );
}

export const NewListing = () => {
  

  return
  (
    <Container style={{listingStyles}}>
    
    </Container>

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