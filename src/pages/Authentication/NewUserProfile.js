import React, { useState, useEffect, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
  Timestamp,
} from "firebase/firestore";
import { LandingFooter } from "../Home/Footer";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { db, auth } from "../../firebase";
import "./styles.css";
import { Form } from "rsuite";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={`${name}`}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});


export const NewUserPage = ({ title }) => {
  const navigate=useNavigate();
  const [user,loading,error] = useAuthState(auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [email,setEmail] = useState("");
  const [userName,setUserName] = useState("");
  const [portfolioMin,setPortfolioMin] = useState("");
  const [portfolioMax,setPortfolioMax] = useState("");
  const formRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    const role = "User"
    
    setIsSubmit(true);
    const newUser = {
      email,
      userName,
      portfolioMin,
      portfolioMax,
      role: "User",
    };
   
   
   
    const collRef = collection(db,"users");
    try {
      await addDoc(collRef,{...newUser}).then((doc) => {
        console.log(doc);
      });
    } catch (err) {
      console.log(err);
    }finally{
      setIsSubmit(false);
      navigate('/');
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
  }
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formErrors);
    }
    if(user){
      const uid = user.uid;
    }
  }, [user,formErrors,formRef,isSubmit] );
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
          onChange={(e)=> setUserName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          sx={{ m: 2, fontFamily: "Garamond", backgroundColor: "whitesmoke" }}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <TextField
          name="portfolioMin"
          label="Portfolio Minimum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e)=> setPortfolioMin(e.target.value)}
        />
        <TextField
          name="portfolioMax"
          label="Portfolio Maximum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e)=> setPortfolioMax(e.target.value)}
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
