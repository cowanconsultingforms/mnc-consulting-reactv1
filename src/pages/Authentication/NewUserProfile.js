import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp,doc,setDoc,documentId } from "firebase/firestore";
import { LandingFooter } from "../Home/Footer";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { db, auth } from "../../firebase";
import "./styles.css";
export const NewUserPage = ({ title }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [portfolioMin, setPortfolioMin] = useState("");
  const [portfolioMax, setPortfolioMax] = useState("");
  const [role, setRole] = useState("User");
  const userRef = collection(db, "users");
  const formRef = useRef();
  const onSubmit = async () => {
    const { email, userName, portfolioMin, portfolioMax, role } =
      formRef.current.getValues();
    const newUser = {
      email,
      userName,
      portfolioMin,
      portfolioMax,
      role,
      created_at: serverTimestamp(),
    };
    const docRef = doc(userRef,userName);
    const docId = documentId(userRef,userName);
  };
  useEffect(() => {});
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
        }}
      >
        <h1>{title} Form</h1>
        <TextField
          name="userName"
          label="User Name"
          sx={{ m: 2, fontFamily: "Garamond" }}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          sx={{ m: 2, fontFamily: "Garamond" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="portfolioMin"
          label="Portfolio Minimum"
          sx={{ m: 2 }}
          onChange={(e) => setPortfolioMin(e.target.value)}
        />
        <TextField
          name="portfolioMax"
          label="Portfolio Maximum"
          sx={{ m: 2 }}
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
