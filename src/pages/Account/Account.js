import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { deleteDoc, doc, getDoc, where, query } from "firebase/firestore";
import React, { useEffect, useState, Container } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import {
  AccGridInfo,
  AccountPageContainer,
  AccountPagePortfolio,
  StyledInput,
} from "./AccountStyles";
import { ProfileEdit } from "./SignOutBox";
import { ProfileButton } from "../../components/Custom/Buttons";
import { db, userSignOut } from "../../firebase";
import { Box, TextField, Stack } from "@mui/material";
import AccountPageDeleteProfileBox from "./DeleteAccount";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOutBox } from "./SignOutBox";
export const AccountPage = () => {
  //hook to get current user
  const [data, setData] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const getUserInfo = async () => {
    const email = auth.currentUser.email;
    const q = query(db,"users",where("email","==",email));
    try {
    const docRef = await getDoc(db, "users", email).then((doc) => {
        setData(...doc.data());

      const docRef = await getDoc(q).then((doc)=>{
        setData(...doc.data())

        console.log(data);
        return data.map((field, idx) => {
          <TextField key={idx} label={field.label} value={field.value} />;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [data]);

  return (
    <Stack className="account-page-container" component="div">
      <h1>My Account</h1>
      {getUserInfo}

      <SignOutBox />
      <AccountPageDeleteProfileBox />
    </Stack>
  );
};

export default AccountPage;
