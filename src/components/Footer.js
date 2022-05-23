import React from "react";
import styled from "styled-components";
import { db, auth, app ,storage} from "../firebase";
import { query, getDocs, where, collection, serverTimestamp } from "firebase/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { getDownloadURL,ref } from "firebase/storage";
import { useEffect } from "react";
const FooterDiv = styled.div`
  background-color: white;
  height: 100%;
  grid-column: 1 / span 3;
  grid-row: 4;
  color: #686868;
`;

const GlobalFooter = ({ imageUrl }) => {
    const images = {
        
    }
    const [downloadURL, loading, error] = useDownloadURL(storage.ref("images/logo.png").getDownloadURL());
    return (
        <FooterDiv>
            </FooterDiv>
    )
}