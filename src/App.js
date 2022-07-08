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
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where,collection } from "firebase/firestore";
import { createTheme,ThemeProvider } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import {Typography} from "@mui/system";


export const App = () => {
  // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const userRef = collection(db, "users");
  const userCheck = async(e)=>{
    e.preventDefault();
    try{
      const q = await query(userRef,where("email","==",user.email));
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) {
      document.getElementById("login-page").style.display = "none";
      document.getElementById('logout').style.display = "list-item";
    }
    if(!user){
      document.getElementById('logout').style.display = "none";
      document.getElementById("login-page").style.display = "list-item"; 
    }
    const unsubscribe = onAuthStateChanged(auth,(userID)=>{
      if(user){
        document.getElementById("login-page").style.display = "none";
        document.getElementById('logout').style.display = "list-item";
      }
      else{
        document.getElementById("login-page").style.display = "list-item";
        document.getElementById('logout').style.display = "none";
      }
      return unsubscribe;
    })
  }, []);

  //returns the navbar on every page, and each route corresponds to a different page
  //the navbar is maintained in the NavBar component ,and is designed to show different options depending on whether the user
  //is signed in and whether they are an administrator

  return (
   
    <div className="App">
      <Container fluid="true" classPrefix="container">
        <NavBar />
      </Container>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminContainer />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<AuthPage title="Login" />} />
        <Route path="/register" element={<AuthPage title="Register" />} />
        <Route path="/listings/rentals" element={<ListingPage title="rentals" />} />
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
