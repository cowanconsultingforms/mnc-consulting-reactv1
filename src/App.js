import { query,where ,getDoc,doc} from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Route, Routes } from 'react-router-dom';
import { Container, Header ,Content, Divider,Stack} from "rsuite";
import './App.css';
import{ NavigationBar } from './components/NavigationBar';
import { auth, db } from './firebase';
import AccountPage from './pages/Account/Account';
import ProfilePage from './pages/Account/Profile';
import AdminPage from './pages/Admin/Admin';
import Contact from './pages/Contact/Contact';
import Landing from './pages/Home/Landing';
import FullPageLogin from './pages/Login/FullPageLogin';
import FullPageRegister from './pages/Register/FullPageRegister';
import { collection } from 'firebase/firestore';
import { FaHome } from 'react-icons/fa';

export const App = () => {

 // const queryRef = query(collRef, query => query.where('Role', '==', 'Administrator'));
  const [user] = useAuthState(auth);
  
  

  return (
    <div className="App">
      
        <NavigationBar />
        <Divider />
   
     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<FullPageLogin />} />
        <Route path="/register" element={<FullPageRegister />} />
      </Routes>
    </div>
  );}



export default App;


 class ErrorBoundary extends React.Component {
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
