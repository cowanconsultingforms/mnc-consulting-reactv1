import styled from "styled-components";
import { FaHome } from 'react-icons/fa';
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from '../pages/Login/Login';
import { Dropdown } from "rsuite";
import { auth, db, userSignOut } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import React from 'react';
import {Container,Nav,Navbar,Header,Divider} from 'rsuite';
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
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-color: white;
  box-shadow: 0px 5px 10px 2px #888888;
  text-decoration:none;
  overflow:hidden;
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

export const NavBar = () => {

 
  const navigate = useNavigate();

    const pages = [
      {
        page: "/contact",
        text: "Contact",
        onClickFunc: () => navigate("/contact"),
        id: "contact-page",
      },
      {
        page: "/account",
        text: "Account",
        onClickFunc: () => navigate("/account"),
        id: "account-page",
      },
      {
        page: "/listings",
        text: "Sales and Rentals",
        onClickFunc: () => navigate("/listings"),
        id: "listing-page",
      },
      {
        page: "/admin",
        text: "Administrator",
        onClickFunc: () => navigate("/admin"),
        id: "admin-page",
      },
      {
        page: "/login",
        text: "Login/Register",
        onClickFunc: () => navigate("/login"),
        id: "login-page"
      },
    ];
  const renderNavBarItems = () => { 
      
      return (
        <React.Fragment>
          {
            pages.map((page, idx) => (
              <NavBarItem key={idx} onClick={page.onClickFunc}>
                {page.text}
              </NavBarItem>
            ))}

          {pages.map((page, idx) => (
            <NavBarItem key={idx} onClick={page.onClickFunc}>
              {page.text}
              <Divider vertical />
            </NavBarItem>
          ))}
        </React.Fragment>
      );
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
            <NavBarItem id={page.id} key={idx} onClick={page.onClickFunc}>
              {page.text}
            </NavBarItem>
            ))}
        
      </RightSection>
    </MainNavBar>
  );
};



export default NavBar;
