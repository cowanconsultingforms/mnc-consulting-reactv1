import React from 'react';
import styled from 'styled-components';
import { db, auth, app } from '../../firebase';
import { query, getDocs, where, collection, serverTimestamp } from 'firebase/firestore';
import { useCollection ,useCollectionData} from 'react-firebase-hooks/firestore';
import { Container, FlexboxGrid,Carousel,Form,Panel,Uploader,Button,ButtonToolbar } from 'rsuite';

export const ListingPage = () => { 
    const [value,loading,snapshot,error] = useCollectionData(db,collection('listings'));
    return(
 
    <Container className="listing-page-container">

    </Container>
    )
}
const fileList = [
  {
    name: "a.png",
    fileKey: 1,
    url: "https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png",
  },
  {
    name: "b.png",
    fileKey: 2,
    url: "https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png",
  },
];
const instance = (
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
);

export default ListingPage;