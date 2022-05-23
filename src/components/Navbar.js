import styled from "styled-components";
import { FaHome } from 'react-icons/fa';
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from '../pages/Login/Login';
import { Dropdown } from "rsuite";
import { auth, db, userSignOut } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import React from 'react';
import {Container,Nav,Navbar,Header} from 'rsuite';
const LeftSection = styled.div`
font-weight: bold;
font-size:20px;
color:white;
justify-content:space-between;
text-decoration:none;
`;


const StyledButton = styled.button`
text-decoration:none`

const RightSection = styled.div`
  font-size: 20px;
  display: block;
  color: white;
  text-align: center;
  padding: 19px 20px;
  text-decoration: none;
`;

const MainNavBar = styled.div`
  background-color: rgb(196, 196, 196);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-color: white;
  box-shadow: 0px 5px 10px 2px #888888;
  text-decoration:none;
`;

const NavBarItem = styled.button`
  border: none;
  background-color: rgb(196, 196, 196);
  cursor: pointer;
  color: white;
  font-size: 20px;
  padding: 19px 20px;
  text-decoration: none;
  text-align:left;
`;
const LoginNavItem = styled.button`

  color: white;
  padding: 14px 20px;
  width: 100%;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  background-color: #686868;
`;
const CustomDropdown = ({ ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item>
  </Dropdown>
);

const NavBar = () => {

  const[user,loading,error] = useAuthState(auth);
  const navigate = useNavigate();

    const pages = [
      {
        page: "/contact",
        text: "Contact",
        onClickFunc: () => navigate("/contact"),
       
      },
      {
        page: "/account",
        text: "Account",
        onClickFunc: () => navigate("/account"),
        
      },
      {
        page: "/listings",
        text: "Sales and Rentals",
        onClickFunc: () => navigate("/listings"),
      
      },
      {
        page: "/admin",
        text: "Administrator",
        onClickFunc: () => navigate("/admin"),
       
      },
      {
        page: "/login",
        text: "Login/Register",
        onClickFunc: () => navigate("/login"),
       
      },
  ];
  const renderNavBarItems = () => { 
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      pages.pop();
      
      return (
        <React.Fragment>
          <RightSection>
            {pages.map((page, idx) => (
              <NavBarItem key={idx} onClick={page.onClickFunc}>
                {page.text}
              </NavBarItem>
            ))}
          </RightSection>
        </React.Fragment>
      );
    }
  }
  return (
    <MainNavBar className="MainNavBar">
      <LeftSection>
        <NavBarItem href="/">MNC Development 3.20</NavBarItem>
        <FaHome size={25} padding="2"/>
      </LeftSection>
      <RightSection>
        {
          pages.map((page, idx) => (
            <Nav.Item key={idx} onClick={page.onClickFunc}>
              {page.text}
            </Nav.Item>
            ))}
        
      </RightSection>
    </MainNavBar>
  );
};

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
      const pages = [
        {
          page: "/contact",
          text: "Contact",
          onClickFunc: () => navigate("/contact"),
        },
        {
          page: "/account",
          text: "Account",
          onClickFunc: () => navigate("/account"),
        },
        {
          page: "/listings",
          text: "Sales and Rentals",
          onClickFunc: () => navigate("/listings"),
        },
        {
          page: "/admin",
          text: "Administrator",
          onClickFunc: () => navigate("/admin"),
        },
        {
          page: "/login",
          text: "Login/Register",
          onClickFunc: () => navigate("/login"),
        },
      ];
  return (
    <MainNavBar>
      <Navbar appearance="inverse">
          <Navbar.Brand>
          <FaHome size={ 25 } />
        </Navbar.Brand>
          <Nav>
          {pages.map((page, idx) => (
          
            <Nav.Item key={idx} onClick={page.onClickFunc}  >
            {pages.text}
              </Nav.Item>
          ))}
              </Nav>
          <Nav pullRight>
            <Nav.Item>Settings</Nav.Item>
          </Nav>
      
        </Navbar>
  </MainNavBar>
  )
}

export default NavBar;
