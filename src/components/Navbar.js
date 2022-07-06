import { unstable_unsupportedProp } from "@mui/utils";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, collection, query, where, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Divider } from "rsuite";
import styled from "styled-components";
import { auth, db } from "../firebase";

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
  const [loggedIn, setLoggedIn] = useState(false);
  //custom hook to read the user's auth state
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const collectionRef = collection(db, "users");

  const LoginCheck = async (e) => {
    e.preventDefault();
    if(user){
      setLoggedIn(true);
      const userEmail = user.email;
      const q = query(collectionRef, where("email", "==", userEmail));
    try {
      
      await getDoc(q).then((doc) => {
        setUserData(...doc.data());
        document.getElementById("admin-page").style.display = "none";
        console.log(userData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  }
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
  //function to render nav bar items (coded into the navbar object)
  const renderNavBarItems = async(e) => {
    e.preventDefault();
    try{
      LoginCheck()
    }catch(err){
      console.log(err);
    }
    return (
      <React.Fragment>
        {pages.map((page, idx) => (
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
  };
  // on loading, performs a check to see if the user is logged in
  useEffect(() => {
    if(user){
      document.getElementById("login-page").style.display = "none";
    }else{
      document.getElementById("logout").style.display = "none";
    }
    const unsubscribe = async() => onAuthStateChanged(auth,(user)=>{
      if(user){
        setLoggedIn(true);
        document.getElementById("logout").style.display = "flex";
      }else{
        setLoggedIn(false);
      }
      if(!user){
        document.getElementById("login-page").style.display = "flex";
        document.getElementById('logout').style.display = "none";
    }
  return unsubscribe})
  },[user]);

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
