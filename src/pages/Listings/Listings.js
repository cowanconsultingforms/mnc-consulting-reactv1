import React, { useEffect, useState, useRef } from "react";
import { db, auth, app, dbRef} from "../../firebase";
import { Component } from 'react'
import { Carousel } from "react-bootstrap";
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import * as ReactDOM from 'react-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import './listingsStyles.css';
import BasicTable from "./Table";


import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot, 
  QuerySnapshot,
  addDoc

} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  Container,
  FlexboxGrid,
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
  Sidebar,
  Footer,
} from "rsuite";

// primary container for Listing Page data
export const ListingPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const formRef = useRef();
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [listed_at, setListedAt] = useState("");
  const [listed_by, setListedBy] = useState("");
  const [images, setImages] = useState(""); 
  const [description, setDescription] = useState("");
  
  const [listings] = useCollectionData(db, collection("listings"));
const listingRef = collection(db, "listings", where(type, "==", type));
const placeholder = useRef();
const q = query(listingRef, orderBy("listed_at", "desc"));
const [listing] = useCollectionData(q, { idField: "listed_at" });
const getNextListing = async (e) => {
  e.preventDefault();
  const listings = await getDocs(listingRef).then((docs) => {
    return docs.map((doc) => {
      return (listings = {
        id: doc.id,
        ...doc.data(),
      });
    });
  });
};
const getPrevListing = async (e) => {
  e.preventDefault();
};
useEffect(() => {
  return () => {};
}, [listings]);

return(
    <div
      style={{
        display: "block",
        width: 700,
        paddingLeft: 30,
      }}
    >
      <h3>React Suite Sidenav Component</h3>
      <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1">
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1">Status</Nav.Item>
            <div></div>
            <Nav.Item eventKey="2">Price</Nav.Item>
            <div></div>
            <Nav.Item eventKey="3">Bedrooom</Nav.Item>
            <div></div>
            <Nav.Item eventKey="4">Bathroom</Nav.Item>
            <Dropdown eventKey="5" title="Advanced">
              <Dropdown.Item eventKey="4-1">Privacy</Dropdown.Item>
              <Dropdown.Item eventKey="4-2">About</Dropdown.Item>
              <Dropdown.Item eventKey="4-3">Terms</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Container>
      <Header style ={{color: '#808080', fontSize: '20px'}}>MCN Development Listings
      </Header>
      <Content>
      <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

<BasicTable></BasicTable>

   </Content>
 <Footer></Footer>

     
      
     
      </Container>
      </div>
      )};

export default ListingPage;

