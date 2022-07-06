import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, writeBatch } from "firebase/firestore";
import { LandingFooter } from "../Home/Footer";
import { Box, TextField, Button } from "@mui/material";
import { db, auth } from "../../firebase";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
export const NewUserPage = ({ title }) => {
  const batch = writeBatch(db);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [portfolioMin, setPortfolioMin] = useState("");
  const [portfolioMax, setPortfolioMax] = useState("");
  const [docId,setDocId]=useState("");
  const formRef = useRef();
  const auditLogger = async(e)=>{
    e.preventDefault();
   
    const action = "User Registered";
    const userId = user.uid;
    const dateTime = new Date().toLocaleString();
    const userName = user.displayName;
    const description = action + " " + userName + " " + dateTime;
    const docData = {
      action,
      userId,
      dateTime,
      userName,
      description
    }
    const collRef = collection(db, "auditLog");
    try{
      await addDoc(collRef, {...docData}).then((doc)=>{
        console.log(doc,"Audit Log Document Added");
      });
    }catch(err){
      console.log(err);
    }

  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const role = "User";

    setIsSubmit(true);
    const newUser = {
      email,
      userName,
      portfolioMin,
      portfolioMax,
      role: "User",
    };

    const collRef = collection(db, "users");
    try {
      await addDoc(collRef, { ...newUser }).then((doc) => {
        setDocId(doc.id)
        console.log(doc);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
      const action = "New User Created";
      const user = auth.currentUser;
      const auditId = docId;
      

      try {
        await auditLogger();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.userName = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.portfolioMin) {
      errors.portfolioMin = "Portfolio Min is required!";
    }
    if (!values.portfolioMax) {
      errors.portfolioMax = "Portfolio Max is required!";
    }
    return errors;
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formErrors);
    }
    if (user) {
      const uid = user.uid;
    }
  }, [user, formErrors, formRef, isSubmit]);
  return (
    <React.Fragment>
      <Box
        className="new-user-form"
        component="form"
        onSubmit={onSubmit}
        ref={formRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "Garamond",
          backgroundColor: "grey",
        }}
      >
        <h1>{title} Form</h1>
        <TextField
          name="userName"
          label="User Name"
          sx={{ m: 2, fontFamily: "Garamond", backgroundColor: "whitesmoke" }}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          sx={{ m: 2, fontFamily: "Garamond", backgroundColor: "whitesmoke" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="portfolioMin"
          label="Portfolio Minimum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e) => setPortfolioMin(e.target.value)}
        />
        <TextField
          name="portfolioMax"
          label="Portfolio Maximum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e) => setPortfolioMax(e.target.value)}
        />
        <Button variant="contained" className="add-user-button" type="submit">
          Complete Registration
        </Button>
      </Box>
      <LandingFooter />
    </React.Fragment>
  );
};

export default NewUserPage;
