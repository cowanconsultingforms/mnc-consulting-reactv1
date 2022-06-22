import React from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import {storage} from '../firebase';



export const GetImage =() => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    const [downloadUrl, loading, error] = useDownloadURL(reference);
    getDownloadURL(reference).then(() => {
      return (
        <React.Fragment>
          <img src={downloadUrl} alt="logo" />
        </React.Fragment>
      );
    });
};
  
export const DownloadURL = () => {
const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
  const [value, loading, error] = useDownloadURL(storage,reference);

  return (
    <div>
      <p>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Download URL: Loading...</span>}
        {!loading && value && (
          <React.Fragment>
            <img src={value} alt="logo"></img>
          </React.Fragment>
        )}
      </p>
    </div>
  );
};
export default DownloadURL;