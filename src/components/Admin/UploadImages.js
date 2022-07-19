import React,{ useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";
import { Box,Button, Typography } from '@mui/material';
import {InputUnstyled} from '@mui/base';
import {updateDoc,writeBatch,doc} from "firebase/firestore";
export const UploadImages =({listingId}) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = doc(db,`listings/${listingId}/images`);
  const uploadFile = async() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${listingId}images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };
  const addImagesToFirestore = () => {
    const batch = writeBatch(db);
    imageUrls.forEach((url) => {
      const imageRef = ref(storage, `images/${url.split("/").pop()}`);
      batch.set(imageRef, url);
    }
    );
    batch.commit().then(() => {
      console.log("Images added to firestore");
    }).catch((err) => {
      console.log(err);
    }
    );
  }
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="file-uploader">
      <Typography variant="h3">{`${listingId}` + "successfully added to Database! Add pictures of the property"}</Typography>
      <InputUnstyled
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default UploadImages;