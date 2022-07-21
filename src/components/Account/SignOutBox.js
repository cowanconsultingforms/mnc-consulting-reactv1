import { StyledProfileLabel, AccountPageSignOut } from "./AccountStyles";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { userSignOut, db, auth } from "../../firebase";
import ProfileButton from "../../components/Custom/Buttons";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box,Typography,TextField } from "@mui/material";
import accountAuditLogger from "../../components/Authentication/AccountPageComponents";
import {collection} from 'firebase/firestore';
export const SignOutBox = () => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try{
      const user = await auth.currentUser;
      setCurrentUser(user.displayName);
    }catch(error){
      console.log(error)
    }
  };
  
  const handleSignOut = async () => {
    await userSignOut().then(() => navigate("/"))
  };
  
  useEffect(() => {
    getCurrentUser();
  },[currentUser]);
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        position: "relative",
        textAlign: "left",
        backgroundColor: "#eeeeee",
        color: "rgb(128, 128, 128)",
        fontSize: "20px",
      }}
      className="SignOutBox"
    >
      <Typography variant="h4">Sign Out</Typography>

      <StyledProfileLabel>
        Signing out? You can always log back in
      </StyledProfileLabel>

      <ProfileButton onClick={handleSignOut}>Sign Out</ProfileButton>
    </Box>
  );
};

export default SignOutBox;
