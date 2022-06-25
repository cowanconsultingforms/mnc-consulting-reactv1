import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/Navbar";
import { auth, db } from "./firebase";
import AccountPage from "./pages/Account/Account";
import ProfilePage from "./pages/Account/Profile";
import AdminPage from "./pages/Admin/Admin";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Home/Landing";
import { AuthPage } from "./pages/Authentication/AuthContainer";
import { ListingPage } from "./pages/Listings/Listings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "rsuite";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where } from "firebase/firestore";

export const App = () => {
  // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      document.getElementById("login-page").style.display = "none";
    }
    if(!user){
      document.getElementById("login-page").style.display = "block";
    }
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
