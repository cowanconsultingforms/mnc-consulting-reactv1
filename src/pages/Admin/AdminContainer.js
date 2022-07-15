import React, { useState, useEffect } from "react";
import "./styles.css";
import AddListingForm from "./AddListing";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, where, getDoc,collection } from "firebase/firestore";
import FileUploader from "./UploadImages";
import { Box, Typography,Button,Divider,Stack } from "@mui/material";
import SearchUser from "./SearchUser";
import ViewAuditLog from "./ViewAuditLog";
import {Item} from "./AdminPageComponents";
const Header = () => {
  return (
    <Typography
      variant="h4"
      sx={{ fontWeight: "bold", fontFamily: "Garamond" }}
    >
      Administrator Dashboard
    </Typography>
  );
};
const HeaderTwo = () => {
  return (
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      Add New Listing
    </Typography>
  );
};
const AdminPage = ({ role }) => {
  const [user, loading, error] = useAuthState(auth);
  
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [currentUser, setCurrentuser] = useState(null);
  const checkAdmin = async() => {
    try {
      const user = auth.currentUser;
      const userRef = collection(db,"users");
      const q = query(userRef,where("email","==",user.email));
      getDoc(userRef)
        .then((doc) => {
          if (doc.data().role === "Administrator") {
            setAdmin(true);
            setCurrentuser(user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    if (user.email === "") {
    }
  };
  useEffect(
    () => {});

  return (
    <Stack  className="admin-container"
    direction="column"
    sx={{display:'flex',flexDirection:'column',margin:'5%',fontFamily:'Garamond'}}>
     <Item> <Header /></Item>
     <Item> <Divider /></Item>
      <AddListingForm />
      <SearchUser />
    </Stack>
  );
};

export default AdminPage;
