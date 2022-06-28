import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref as reff } from "firebase/storage";
import { storage } from "../../firebase";
import { ImageBox } from "../../components/Custom/Containers";
import { Container } from "rsuite";

const style = {
    justifyContent: 'center',
    alignItems:'center',
    padding:'100px'
}
export const DownloadLogo = () => {
  const reference = reff(storage, "images/mncdevelopmentlogo.jpg");
  const [value, loading, error] = useDownloadURL(reference);

  const DownloadURL = () => {
    return (
      (<React.Fragment>
            
              <ImageBox
                id="logo"
                src={value}
                alt="logo"
                style={style}
              ></ImageBox>
            </React.Fragment>
     
      ),
      [value, loading, error]
    );
  };
  return (
    <React.Fragment>
      <img src={DownloadURL()} alt="logo" />
    </React.Fragment>
  );
};
