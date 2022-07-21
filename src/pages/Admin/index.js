import PropTypes from "prop-types";
import React,{useEffect,useState} from "react";
import AddListingForm from "../../components/Admin/AddListing";
import AddListing from "../../components/Admin/AddListing";
import SearchUser from "../../components/Admin/SearchUser";
import UploadImages from "../../components/Admin/UploadImages";
import { Box, Divider, Stack } from "@mui/material";
import { db } from '../../firebase';
import { where, getDoc, query,collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import ViewAuditLog from "../../components/Admin/ViewAuditLog";



const AdminPage = (props) => {
  
  
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [currentUser, setCurrentuser] = useState(null);
  const checkAdmin = async() => {
    try {
      
      const userRef = collection(db,"users");
      const q = query(userRef,where("email","==",props.user.email));
      await getDoc(userRef)
        .then((doc) => {
          if (doc.data().role === "Administrator") {
            setAdmin(true);
            setCurrentuser(props.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    if (props.user.email === "") {
    }
  };
  useEffect(
    () => {});

  return (
    <Stack className="admin-container" component="div">

    </Stack>
  );
};

AdminPage.propTypes = {
  currentUser: PropTypes.object,
  

}
export default AdminPage;
