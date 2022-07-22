import propTypes from "prop-types";
import React from "react";
import AddListingForm from "../../components/Admin/AddListing";
import AdminPage from "../../components/Admin/AdminContainer";
import AddListing from "../../components/Admin/AddListing";
import SearchUser from "../../components/Admin/SearchUser";
import UploadImages from "../../components/Admin/UploadImages";
import { Box, Divider, Stack } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { db } from '../../firebase';
import { where, getDoc,query, collection } from 'firebase/firestore';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const userCollRef = collection(db, "users");
  
  const checkAdmin = async () => {
    const email = props.user.email;
    try {
      const q = query(userCollRef, where("email", "===", props.user.email));
      
    } catch (error) {
      
    }

  };
  useEffect(() => {});
  return <Stack className="admin-home-page" component="div" flexDirection="column">
    <SearchUser />
    <Divider />
    <AddListing />
  </Stack>;
};
export default AdminDashboard;
