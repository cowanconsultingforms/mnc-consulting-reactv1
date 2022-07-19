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

NavBar.propTypes = propTypes;
export const NavBar = (props) => {

  //custom hook to read the user's auth state
  const { user } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState({user});
  const collectionRef = collection(db, "users");

    const hideButtons = async () => {
      if (loggedIn && admin) {
        document.getElementById('admin-page').style.display = "list-item";
        document.getElementById("login-page").style.display = "none";
        document.getElementById("logout").style.display = "list-item";
      } else if (loggedIn) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("logout").style.display = "list-item";
        document.getElementById("admin-page").style.display = "none";
      } else {
        document.getElementById("login-page").style.display = "list-item";
        document.getElementById("logout").style.display = "none";
        document.getElementById("admin-page").style.display = "none";
      }
  };
  
  const getUserInfo = async ({ user }) => {
    if (user) {
      try {
        const userEmail = user.email;
        const q = query(collectionRef, where("email", "==", userEmail));
        await getDoc(q).then((doc) => {
          setUserData(...doc.data());
          document.getElementById("admin-page").style.display = "none";
          console.log(userData);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
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

export default NavBar;
