import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AccGridInfo,  AccountPageContainer,
  AccountPagePortfolio, AccountPageSignOut, StyledInput, StyledProfileLabel
} from "../../components/AccountStyles";
import { AccountHeader } from "./AccountHeader";
import { ProfileButton } from '../../components/Buttons';
import { auth, db, userSignOut } from "../../firebase";
const AccountPage = () => {
  const user = sessionStorage.getItem('user');




  return (
    <AccountPageContainer>
      <AccountHeader />
      <AccGridInfo />
    </AccountPageContainer>
  );

};

const APSignOutContainer = styled.div``;
export default AccountPage;
