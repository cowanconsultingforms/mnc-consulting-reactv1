import React, { useEffect, useState, useRef } from "react";
import { db, auth, app } from "../../firebase";
import { Component } from 'react'
import * as ReactDOM from 'react-dom';
import './listingsStyles.css';

import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot, 
  QuerySnapshot

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
//import './listingsStyles.css';

// primary container for Listing Page data
export const ListingPage = () => {
  const [listings] = useCollectionData(db, collection('listings'));
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
  
  /*
  This is JavaScript



  var tbody = document.getElementByID('tbody');


  function AddItemToTable(properties){
    let trow = document.createElement("trow");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');

    td1.innerHTML = bathrooms;
    td2.innerHTML = bedrooms;
    td3.innerHTML = city;
    td4.innerHTML = description;
    td5.innerHTML = price;
    td6.innerHTML = state;
    td7.innerHTML = street;
    td8.innerHTML = zip;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    tbody.apppendChild(trow);


  }

  function AddAllItemsToTable(listings){
    tbody.innerHTML="";
    listings.forEach(element => {
      AddItemToTable(element.bathrooms, element.bedrooms, element)
    });
  }



   async function GetAllDataOnce(){
   const querySnapshot = await getDocs(collection(db, 'listings'))
   var properties = [];
   querySnapShot.forEach(doc => {
    properties.push(doc.data());
   });
      AddAllItemsToTable(listings);
  }

  async function GetAllDataRealtime(){
    const dbRef = collection(db, 'listings');

    onSnapShot(dbRef,(querySnapshot)=>{
      var properties
    })



  }


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
      <Header style ={{color: '#808080', fontSize: '20px'}}>MCN Development Listings
      </Header>
      <Content>
      <Carousel className="custom-slider">
      <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" 
      height="250" />
      <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" 
      height="250" />
      <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" 
      height="250" />
      <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" 
      height="250" />
      <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" 
      height="250" />
      </Carousel>

      </Content>
      <Sidebar>
      <Table id = "tbody1">
 <Table.Column width={70} align="center" fixed>
 <Table.HeaderCell>Bathrooms</Table.HeaderCell>
 <Table.Cell dataKey="bathrooms" />
 <Table.HeaderCell>Bedrooms</Table.HeaderCell>
 <Table.Cell dataKey="bedrooms" />
 <Table.HeaderCell>City</Table.HeaderCell>
 <Table.Cell dataKey="city" />
 <Table.HeaderCell>Description</Table.HeaderCell>
 <Table.Cell dataKey="description" />
 <Table.HeaderCell>Price</Table.HeaderCell>
 <Table.Cell dataKey="price" />
 <Table.HeaderCell>State</Table.HeaderCell>
 <Table.Cell dataKey="id" />
 <Table.HeaderCell>Street</Table.HeaderCell>
 <Table.Cell dataKey="id" />
 <Table.HeaderCell>Zip</Table.HeaderCell>
 <Table.Cell dataKey="id" />
 </Table.Column>
</Table>

      </Sidebar>
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
