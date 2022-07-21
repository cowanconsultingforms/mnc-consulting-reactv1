import { onAuthStateChanged } from "firebase/auth";
import { getDoc, collection, query, where, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { Divider } from "@mui/material";
import { useAuth } from '../../context/AuthContext';
import {propTypes} from "prop-types";
const NavBarItem = styled.button`
  border: none;
  background-color: rgb(196, 196, 196);
  cursor: pointer;
  color: white;
  font-size: 20px;
  padding: 19px 20px;
  text-decoration: none;
  text-align: left;
`;


export const NavBar = () => {


  const collectionRef = collection(db, "users");
  const [ admin, setAdmin ] = useState('');
  //standard react hook to navigate to a new page
  const navigate = useNavigate();
  //objects for the navbar and their props
  const pages = [
    {
      page: "/admin",
      text: "Administrator",
      onClickFunc: () => navigate("/admin"),
      id: "admin-page",
    },
    {
      page: "/contact",
      text: "Contact",
      onClickFunc: () => navigate("/contact"),
      id: "contact-page",
    },
    {
      page: "/listings",
      text: "Listings",
      onClickFunc: () => navigate("/listings"),
      id: "listing-page",
    },
    {
      page: "/account",
      text: "Profile",
      onClickFunc: () => navigate("/account"),
      id: "account-page",
    },

    {
      page: "/",
      text: "Login/Register",
      onClickFunc: () => navigate("/login"),
      id: "login-page",
    },
    {
      page: "/",
      text: "Logout",
      onClickFunc: () => {
        auth.signOut();
        navigate("/");
      },
      id: "logout",
    },
  ];
  
  //renders the navbar, divided into 2 sections, the left side and the right side
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left">
        <NavBarItem href="/" onClick={() => navigate("/")}>
          MNC Development 3.20
        </NavBarItem>
        <FaHome size={25} padding="2" />
      </div>
      <div className="navigation-bar-right">
        {pages.map((page, idx) => (
          <NavBarItem id={page.id} key={idx} onClick={page.onClickFunc}>
            {page.text}
          </NavBarItem>
        ))}
      </div>
    </div>
  );
};
NavBar.propTypes = {

}
export default NavBar;
