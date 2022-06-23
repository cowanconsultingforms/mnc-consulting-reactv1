import { Navbar, Nav } from 'rsuite';
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';


const navbar= (
    <Navbar>
      <Navbar.Brand href="#">MCN Development</Navbar.Brand>
      <Nav>
      <Nav.Item>Home</Nav.Item>
      <IconButton aria-label="home">
        <HomeIcon></HomeIcon>
      </IconButton>
        <Nav.Item>News</Nav.Item>
        <Nav.Item>Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item>Company</Nav.Item>
          <Nav.Item>Team</Nav.Item>
          <Nav.Menu title="Contact">
            <Nav.Item>Via email</Nav.Item>
            <Nav.Item>Via telephone</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>
      </Nav>
      <Nav.Item>Settings</Nav.Item>
      <IconButton aria-label="">
        <HomeIcon></HomeIcon>
        </IconButton>
    </Navbar>
  );
  ReactDOM.render(navbar);

  export default navbar