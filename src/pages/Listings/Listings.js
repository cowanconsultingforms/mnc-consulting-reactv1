import React, { useEffect, useState, useRef } from "react";
import { db, auth, app } from "../../firebase";
//import { Sidenav, Nav, Dropdown, Row } from 'rsuite';
//import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
//import { Pagination } from 'rsuite';
//import './App.css';
//import slideIndex from 'slideIndex';
//Both imagecarousel and tableapp make the screen white. 
//import {ImageCarousel} from "./imageCarousel"; 
//import {TableApp} from "./tables";
import { Component } from 'react'
import * as ReactDOM from 'react-dom';
import './listingStyles.css';


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
  Sidebar,
  Footer
} from "rsuite";
import Listing from "./Listing";
//import './styles.css';
import './listingsStyles.css';

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
    <div style={{
      display: 'block', width: 700, paddingLeft: 30}}>
      <h3>
        React Suite Sidenav Component
        </h3>
      <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
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
      <Header style ={{color: '#808080', fontSize: '20px'}}>MCN Development Listings</Header>
      <Container>
      
        <Content>Content</Content>
        <Table>
        <Table.Column width={70} align="center" fixed>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.Cell dataKey="id" />
        </Table.Column>
        </Table>

        <Sidebar>Listings
          <Content>
          <Carousel className="custom-slider">
          <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" height="250" />
          <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="250" />
          <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="250" />
          <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="250" />
          <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="250" />
        </Carousel>
          </Content>
        </Sidebar>

      </Container>
      <Footer>Footer</Footer>
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
