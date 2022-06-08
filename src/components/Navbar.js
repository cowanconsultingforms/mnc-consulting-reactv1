import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Divider,Modal } from 'rsuite';
import styled from "styled-components";
import { auth } from '../firebase';


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

export const NavBar = () => {
  //logic for the navbar modal
  const [open,setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const LoginCheck = () => {
    if (user) {
      setLoggedIn(true);
    }
  }
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
        text: "Properties",
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
        page: "/",
        text: "Login/Register",
        onClickFunc: () => navigate("/login"),
        id: "login-modal"
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
  React.useEffect(() => {
    LoginCheck();
  
  },[])
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left">
        <NavBarItem href="/" onClick={()=>navigate('/')}>MNC Development 3.20</NavBarItem>
        <FaHome size={25} padding="2"/>
      </div>
      <div className="navigation-bar-right">
        {
          pages.map((page, idx) => (
            <NavBarItem id={page.id} key={idx} onClick={page.onClickFunc}>
              {page.text}
            </NavBarItem>
            ))}
        
      </div>
    </div>
  );
};



export default NavBar;
