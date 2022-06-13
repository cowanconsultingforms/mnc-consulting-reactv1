import { getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Divider,Modal } from 'rsuite';
import styled from "styled-components";
import { auth,db } from '../firebase';


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
  //logic for the navbar modal opener to login 
  const [open,setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //custom hook to read the user's auth state
  const [user, loading, error] = useAuthState(auth);
  const [userData,setUserData] = useState({})
  const LoginCheck = async () => {
    
    if (user) {
      setLoggedIn(true);
      await getDoc(db, 'users', user.uid).then(doc => {
        setUserData(doc.data());
        document.getElementById('admin-page').style.display = 'none';
      })
    }
  }
      
    
  
  //standard react hook to navigate to a new page
  const navigate = useNavigate();
  //objects for the navbar and their props
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
  const adminPages = [{

  }]
  //function to render nav bar items (coded into the navbar object)
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
  // on loading, performs a check to see if the user is logged in
  React.useEffect(() => {
    LoginCheck();
  
  }, [])
  
  //renders the navbar, divided into 2 sections, the left side and the right side
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
