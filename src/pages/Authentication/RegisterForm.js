import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { auth, db, signUp } from "../../firebase";
import { CustomButton } from "../../components/Custom/Buttons";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";
import "./styles.css";

export const RegisterForm = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
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
    }
  };

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
  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {}, []);
  return (
    <div className="register-form">
      <Box
        component="form"
        autocomplete={true}
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
          <Button onClick={sendPasswordResetEmail()}>Forgot Password?</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default RegisterForm;
