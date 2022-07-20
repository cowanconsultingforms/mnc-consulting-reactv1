import React from 'react';
import ReactDOM,{createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./AuthProvider";
import {useAuth} from './context/AuthContext';
import AccountPage from "./components/Account/Account";
import ProfilePage from "./pages/Account/Profile";
import AdminContainer from "./components/Admin/AdminContainer";
import Contact from "./components/Contact/Contact";
import HomePage from "./pages/Home/index";
import AuthPage from './pages/Authentication/index';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>

   <App />
    
  </BrowserRouter>
);

