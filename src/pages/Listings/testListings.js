
//import 'rsuite/dist/styles/rsuite-default.css';
import { Sidenav, Nav, Dropdown, Row } from 'rsuite';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
//import { Pagination } from 'rsuite';
import './App.css';
//import slideIndex from 'slideIndex';
import React, { useState, useEffect } from 'react';
import tableApp from './Components/tables';
import instance from './Components/navbar';
import { Component } from 'react'
import * as ReactDOM from 'react-dom';

export default function App() {
  
return (
   
	<div style={{
	display: 'block', width: 700, paddingLeft: 20, color: 'gray',
	}}>
  <header>
	<h2 style = {{color: 'gray'}}>MCN Development</h2>
  </header>
	
	
  <Container>
    <div style={{
	display: 'block', width: 700, paddingLeft: 1150
	}}>
          <Header>
            <h2>Listings</h2>
          </Header>
          <Content>Content Info</Content>
    
  
     </div>
    </Container>
    <Container>
      
    <div style={{
	display: 'block', width: 700, paddingLeft: 1150
	}}>
    <h1>Contact us</h1>
    <p>info@cowanconsulting.com </p>
    
      </div>

    </Container>
    <Container>

    </Container>
   
      
	</div>
  
);
};