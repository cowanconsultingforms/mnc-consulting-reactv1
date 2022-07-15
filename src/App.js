import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/Navbar";
import { auth, db } from "./firebase";
import AccountPage from "./pages/Account/Account";
import ProfilePage from "./pages/Account/Profile";
import AdminContainer from "./pages/Admin/AdminContainer";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Home/Landing";
import { AuthPage } from "./pages/Authentication/AuthContainer";
import { ListingPage } from "./pages/Listings/Listings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "rsuite";
import "./App.css";
import { Box, Stack } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme,ThemeProvider } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import {Typography} from "@mui/system";
import UploadImages from "./pages/Admin/UploadImages";

import { query, where, collection,onSnapshot,getDoc } from "firebase/firestore";
import { setPersistence } from "firebase/auth";
import {setLocalPersistence} from './firebase.js';
export const App = () => {
  // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  const [ user, loading, error ] = useAuthState(auth);
  const navigate = useNavigate();
  const userRef = collection(db, "users");
  const [ logggedInUser, setLoggedInUser ] = useState('');
  const childToParent = () => {
    
  }
  const userCheck = async (auth) => {
    if (auth.currentUser !== null) {
      const user = auth.currentUser;
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", user.email));
      try {
        getDoc(q)
          .then((doc) => {
            if (doc.data().role === "Administrator") {
              setLoggedInUser(user);
            }
          })
      }
      catch (err) {
        console.log(err)
      }
 
    }
  }

  /*useEffect(() => {
    
    onAuthStateChanged(auth, (userChanged) => {
      if(userChanged){
        setCurrentUser(userChanged.email);
        getUserInfo();
        console.log(currentUser);   
        document.getElementById("login-page").style.display = "none";
        document.getElementById("logout").style.display = "list-item";
      }else{
        setCurrentUser(null);
        document.getElementById("logout").style.display = "none";
        document.getElementById("login-page").style.display = "list-item";
      }
    });
  }, []); */

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

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminContainer />} />
        <Route path="/admin/add-images" element={<UploadImages />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<AuthPage title="Login" />} />
        <Route path="/register" element={<AuthPage title="Register" />} />


        <Route path="/listings" element={<ListingPage/>} />
        <Route path="/listings/rentals" element={<ListingPage type="rentals" />} />

        <Route
          path="/create-profile"
          element={<AuthPage title="New User Profile" />}
        />
      </Routes>
    </div>
  );
};
//  <Route path="/editListing/:id" element={<EditDocs database={database}/>} />
export default App;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
//const checkUser = () => {
//const [snapshot, loading, error] = useCollectionOnce(
//query(collRef, where("uid", "==", user.uid))
//);
//if (user.isAdmin == "true") {
// return <AdminPage />;
//} else {
// return <FullPageLogin />;
//}
//};
