import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage, auth } from "../../firebase";
import { ImageBox } from "../Custom/Containers";

//standard hook to load the logo image
export const DownloadURL = () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    const [value, loading, error] = useDownloadURL(reference);

    return (
      (
        <React.Fragment>
          {
            <React.Fragment>
              <ImageBox
                id="logo"
                src={value}
                alt="logo"
                style="justify-content:center;"
              ></ImageBox>
            </React.Fragment>
          }
        </React.Fragment>
      ),
      [value, loading, error]
    );
};
  
export default DownloadURL;