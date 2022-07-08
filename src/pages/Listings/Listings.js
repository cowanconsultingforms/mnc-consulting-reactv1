import React, { useEffect, useState, useRef } from "react";
import { db, auth, app, dbRef } from "../../firebase";
import { Component } from "react";
import * as ReactDOM from "react-dom";
import "./listingsStyles.css";
import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot,
  QuerySnapshot,
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
  Footer,
} from "rsuite";
import Listing from "./Listing";
//import './styles.css';
//import './listingsStyles.css';

// primary container for Listing Page data
export const ListingPage = ({ type }) => {
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
      AddItemToTable(element.bathrooms, element.bedrooms, element.city, element.description, element.price, element.state, element.street, element.zip)
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
      var properties = [];
    })

    querySnapshot.forEach(doc =>{
      properties.push(doc.data());
    });
     AddAllItemsToTable(listings);
    })


  */

  return (
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
        <Header style={{ color: "#808080", fontSize: "20px" }}>
          MCN Development Listings
        </Header>
        <Content>
          <Carousel className="custom-slider"></Carousel>
        </Content>
        <Sidebar>
          <Table id="tbody1">
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
              <Table.Cell dataKey="state" />
              <Table.HeaderCell>Street</Table.HeaderCell>
              <Table.Cell dataKey="street" />
              <Table.HeaderCell>Zip</Table.HeaderCell>
              <Table.Cell dataKey="zip" />
            </Table.Column>
          </Table>
        </Sidebar>
      </Container>
    </div>
  );
};

export default ListingPage;
