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
} from "../../components/Custom/AccountStyles";
import {AccountPageSignOutBox} from './AccountPageSignOutBox'
import { AccountHeader } from "./AccountHeader";
import { ProfileButton } from '../../components/Custom/Buttons';
import { auth, db, userSignOut } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "rsuite";
import  AccountPageDeleteProfileBox  from './DeleteAccount';

export const AccountPage = () => {
  //hook to get current user
 
  const user = auth.currentUser;
 
  



  return (
    <AccountPageContainer>
      <Container>
        <AccountHeader />
        <AccGridInfo />
        <AccountPageSignOutBox />
        <AccountPageDeleteProfileBox />
      </Container>
    </AccountPageContainer>
  );

};

export default AccountPage;
