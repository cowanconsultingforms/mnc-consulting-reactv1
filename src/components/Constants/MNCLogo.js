import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref as reff } from "firebase/storage";
import { storage } from "../../firebase";
import { ImageBox } from "../Custom/Containers";

const style = {
  justifyContent: "center",
  alignItems: "center",
  padding: "100px",
};
export const MNCLogo = () => {
  const reference = reff(storage, "images/mncdevelopmentlogo.jpg");
  const [value, loading, error] = useDownloadURL(reference);

  const DownloadURL = async () => {
    if(!loading && !error)
    return (
      (
        <React.Fragment>
          <ImageBox id="logo" src={value} alt="logo" style={style}></ImageBox>
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
export default MNCLogo;