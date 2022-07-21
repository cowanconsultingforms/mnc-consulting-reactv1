import React,{useContext} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/Constants/Navbar";
import { auth, db } from "./firebase";

import { AuthPage } from "./pages/Authentication";
import  ListingPage  from "./pages/Listings/index";
import { useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import "./App.css";
import { Box, Stack } from '@mui/material';
import { createTheme,ThemeProvider } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import {Typography} from "@mui/system";
import UploadImages from "./components/Admin/UploadImages";
import { query, where, collection,onSnapshot,getDoc } from "firebase/firestore";
import { setPersistence } from "firebase/auth";
import { setLocalPersistence } from './firebase.js';
import {HomePage} from './pages/Home/index.js'
export const App = () => {
  // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  
  const navigate = useNavigate();
  const userRef = collection(db, "users");
  const [loggedIn, setLoggedIn] = useState(null);
  const [admin,setAdmin] = useState(false);
  const [userData,setUserData] = useState({});





  //returns the navbar on every page, and each route corresponds to a different page
  //the navbar is maintained in the NavBar component ,and is designed to show different options depending on whether the user
  //is signed in and whether they are an administrator

  return (
    <div className="App">
                <Box
        component="div"
        sx={{
          display:'flex',fontFamily:'Garamond'}}>
        <NavBar />
      </Box>
 
    </div>
  );
};
//  <Route path="/editListing/:id" element={<EditDocs database={database}/>} />
export default App;


