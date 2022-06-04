import React from "react";
import styled from "styled-components";
import { db, auth, app ,storage} from "../firebase";
import { query, getDocs, where, collection, serverTimestamp } from "firebase/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { useEffect } from "react";
import { Container } from "rsuite";
const FooterDiv = styled.div`
  background-color: white;
  height: 100%;
  color: #686868;
`;

const GlobalFooter = () => {
  const [value, loading, error] = useDownloadURL(
    ref(
      storage,
      value = images.map((image) => image.imageUrl)
    )
  );
  const images = [
    {
      id: '1',
      imageUrl: ref(storage, "images/mncthumbnail1.jpg"),
    },
    {
      id: '2',
      imageUrl: ref(storage, "images/mncthumbnail2.jpg"),
    },
    {
      id: '3',
      imageUrl: ref(storage, "images/mncthumbnail3.jpg"),
    },
  ];
  const renderImages = ({images}) => {
    return images.map((id, image) => {
      
      {
        !loading && !error(
          <img
            id={id.toString()}
            src={image.imageUrl}
            alt="thumbnail"
            style="justify-content:center;height:100px;width:69px;"
          ></img>
        );
      }
    });
    };
    
    return (
      <Container className="footer-container">
        {renderImages}
      </Container>
    )
  }
export default Footer;