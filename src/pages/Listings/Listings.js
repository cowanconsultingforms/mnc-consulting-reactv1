import React, { useEffect, useState, useRef } from "react";
import { db, auth, app } from "../../firebase";
import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  Container,
  FlexboxGrid,
  Carousel,
  Form,
  Panel,
  Uploader,
  Button,
  ButtonToolbar,
  Sidenav,
  Dropdown,
  Nav,
  Header,
  Content,
  Table,
} from "rsuite";
import Listing from "./Listing";
import './styles.css';
// primary container for Listing Page data
export const ListingPage = () => {
  /*const [listings] = useCollectionData(db, collection('listings'));
  const listingRef = collection('listings');
  const placeholder = useRef();
  const q = query(listingRef, orderBy("listed_at", "desc"));
  const [listing] = useCollectionData(q,{ idField: "listed_at" });
  const getNextListing = async (e) => { 
    e.preventDefault();
    const listings = await getDocs(listingRef).then((docs) => {
      return docs.map((doc) => {
        return listings = {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }
  const getPrevListing = async (e) => {
    e.preventDefault();
    
  }
  useEffect(() => {
    return () => {
      
    };
  }, [listings])
  */

  return (
    <div
      style={{
        display: "block",
        width: 700,
        paddingLeft: 20,
        color: "gray",
      }}
    >
      <header>
        <h2
          style={{
            color: "gray",
          }}
        >
          {" "}
          MNC Development{" "}
        </h2>{" "}
      </header>{" "}
      <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1">
        <Sidenav.Body>
          <Nav>
            <div>
              <Nav.Item eventKey="1"> Status </Nav.Item>{" "}
            </div>{" "}
            <div>
              <Nav.Item eventKey="2"> Price </Nav.Item>{" "}
            </div>{" "}
            <div> </div> <Nav.Item eventKey="3"> Bedrooom </Nav.Item>{" "}
            <div> </div> <Nav.Item eventKey="4"> Bathroom </Nav.Item>{" "}
            <Dropdown eventKey="5" title="Advanced">
              <Dropdown.Item eventKey="4-1"> Privacy </Dropdown.Item>{" "}
              <Dropdown.Item eventKey="4-2"> About </Dropdown.Item>{" "}
              <Dropdown.Item eventKey="4-3"> Terms </Dropdown.Item>{" "}
            </Dropdown>{" "}
          </Nav>{" "}
        </Sidenav.Body>{" "}
      </Sidenav>{" "}
      <Container>
        <div
          style={{
            display: "block",
            width: 700,
            paddingLeft: 1150,
          }}
        >
          <Header>
            <h2> Listings </h2>{" "}
          </Header>{" "}
          <Content> Content Info </Content>
          <table
            style={{
              color: "gray",
              border: "10px solid",
            }}
          >
            <tr>
              {" "}
              Status <td> Active </td>
            </tr>{" "}
            <tr>
              {" "}
              Price <td> 1 </td>{" "}
            </tr>{" "}
            <tr>
              {" "}
              Bedrooms <td> 3 </td>{" "}
            </tr>{" "}
            <tr>
              {" "}
              Bathroom <td> 1 </td>{" "}
            </tr>{" "}
          </table>
        </div>{" "}
      </Container>{" "}
      <Container>
        <div
          style={{
            display: "block",
            width: 700,
            paddingLeft: 1150,
          }}
        >
          <h1> Contact us </h1> <p> info @cowanconsulting.com </p>
        </div>
      </Container>{" "}
      <Container>
        <div
          style={{
            display: "block",
            width: 700,
            paddingLeft: 215,
          }}
        >
          <h2> Active and Hoverable Pagination </h2>{" "}
          <p> Move the mouse over the numbers. </p>
          <div class="pagination">
            <a href="#"> & laquo; </a> <a href="#"> 1 </a>{" "}
            <a class="active" href="#">
              {" "}
              2{" "}
            </a>{" "}
            <a href="#"> 3 </a> <a href="#"> 4 </a> <a href="#"> 5 </a>{" "}
            <a href="#"> 6 </a> <a href="#"> & raquo; </a>{" "}
          </div>{" "}
        </div>{" "}
      </Container>
    </div>
  );
};

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
  ></Uploader>
);

export default ListingPage;
