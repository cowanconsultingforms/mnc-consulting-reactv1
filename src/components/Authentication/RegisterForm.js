import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { auth,  } from "../../firebase";
import { CustomButton } from "../Custom/Buttons";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
//import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
//import { Footer } from "../Home/Footer";
import LandingFooter from "../Constants/Footer";
export const RegisterForm = ({ title }) => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError]= useState({});
  const navigate = useNavigate();
  const formRef = useRef();

  const handleAction = async (e) => {
    e.preventDefault();
    if (validatePassword() === true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    } finally {
      const user = auth.currentUser;
      console.log(JSON.stringify(user));
      sessionStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userToken", JSON.stringify(user));
      navigate("/create-profile");
    }setError(listErrors(error));
  };
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email);
  };
  const listErrors = (error)=>{
    const errors = {};
    Object.keys(error).forEach((key)=>{
      errors[key] = error[key].message;
    }
    )
    return errors;
  }
  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  useEffect(() => {
    if(user){

    }
  }, [user,formRef,email,password,confirmPassword]);
  return (
    <div className="register-form">
      <Box
        component="form"
        autoComplete
        noValidate
        ref={formRef}
        onSubmit={handleAction}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Garamond",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="email"
          label="Email :"
          variant="outlined"
          autocomplete="username"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            backgroundColor: "whitesmoke",
            fontFamily: "Garamond",
            margin: "5%",
          }}
        />
        <TextField
          id="password"
          label="Password :"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor: "whitesmoke",
            fontFamily: "Garamond",
            margin: "5%",
          }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password :"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            backgroundColor: "whitesmoke",
            fontFamily: "Garamond",
            margin: "5%",
          }}
        />
        <ButtonGroup>
          <CustomButton title={title} handleAction={handleAction} type="submit">
            Register
          </CustomButton>
          <Button onClick={resetPassword}>Forgot Password?</Button>
        </ButtonGroup>
      </Box>
      <LandingFooter/>
    </div>
  );
};

export default RegisterForm;
