import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/Navbar';
import { auth,db } from './firebase';
import AccountPage from './pages/Account/Account';
import ProfilePage from './pages/Account/Profile';
import AdminPage from './pages/Admin/Admin';
import Contact from './pages/Contact/Contact';
import Landing from './pages/Home/Landing';
import FullPageLogin from './pages/Login/LoginForm';
import FullPageRegister from './pages/Register/FullPageRegister';
import {ListingPage} from './pages/Listings/Listings';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'rsuite';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query,where } from 'firebase/firestore';

export const App = () => {

 // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  //hook to check for current user
  const user = auth.currentUser;
  useEffect(() => {
   
      if (user) {
    
          document.getElementById('login-modal').style.display = 'none';
        
        console.log(user.email);
      }
    })
  
  

  return (
    <div className="App">
      <Container fluid="true" classPrefix='container'>
        <NavBar />
      </Container>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<FullPageLogin />} />
        <Route path="/register" element={<FullPageRegister />} />
        <Route path="/listings" element={<ListingPage />} />
      </Routes>
    </div>
  );}



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
