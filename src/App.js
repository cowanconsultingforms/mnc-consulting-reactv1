import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/Constants/Navbar";
import { auth, db } from "./firebase";
import { AuthPage } from "./pages/Authentication";
import ListingPage from "./pages/Listings/index";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import UploadImages from "./components/Admin/UploadImages";
import {
  query,
  where,
  collection,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { setPersistence } from "firebase/auth";
import { setLocalPersistence } from "./firebase.js";
import { useAuth } from "./context/AuthContext";
import AccountPage from "./pages/Account/index";
import Contact from "./pages/Contact/index";
import HomePage from "./pages/Home/index";
import AdminDashboard from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from "@firebase/auth";
export const App = () => {
  // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  //const { user,getUser } = useAuth();

  const [ user, loading, error ] = useAuthState(auth);
  const navigate = useNavigate();
  const userRef = collection(db, "users");
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const q = query(userRef, where("email", "===", userData));

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setLocalPersistence();
    if (!loading && !error) {
      const loadUser = async () => {
        if (user) {
          setLoggedIn(true);
          
          getDoc(q).then((doc) => {
            if (doc) {
              setUserData(...doc.data());
              if (doc.data().role === 'Administrator') {
                setAdmin(true);
              }
              console.log(userData);
            }
          });
        }
      };
    
      const hideButtons = async () => {
        if (loggedIn && admin) {
          document.getElementById("admin-page").style.display = "list-item";
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
      hideButtons();
    }
});
  return unsubscribe;
  
}, [user,admin,loggedIn]);
  //returns the navbar on every page, and each route corresponds to a different page
  //the navbar is maintained in the NavBar component ,and is designed to show different options depending on whether the user
  //is signed in and whether they are an administrator

  return (
    <div className="App">

        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/add-images" element={<UploadImages />} />
          <Route path="/login" element={<AuthPage title="Login" />} />
          <Route path="/register" element={<AuthPage title="Register" />} />
          <Route path="/listings" element={<ListingPage />} />
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
