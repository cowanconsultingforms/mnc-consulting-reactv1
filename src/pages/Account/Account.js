import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AccGridInfo,
  AccountPageContainer,
  AccountPagePortfolio,
  AccountPageSignOut,
  StyledInput,
} from "./AccountStyles";
import {AccountPageSignOutBox} from './AccountPageSignOutBox'
import { ProfileButton } from '../../components/Custom/Buttons';
import { auth, db, userSignOut } from "../../firebase";
import { Container } from "rsuite";
import  AccountPageDeleteProfileBox  from './DeleteAccount';

export const AccountPage = () => {
  //hook to get current user
  const [data, setData] = useState({})
  const getUserInfo = async () => { 
 
   
  
  }
  
  useEffect(() => {

  },[])



  return (
    <Container className="account-page-container">
      <h1>My Account</h1>
     
 
        <AccountPageSignOutBox />
        <AccountPageDeleteProfileBox />
     
    </Container>
  );

};

export default AccountPage;
