import { Box, Typography,Button,TextField } from "@mui/material";
import React,{useRef,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

export const ContactForm = () => {
  const navigate = useNavigate();
  const formRef= useRef();
  return (
    <React.Fragment>
    <Typography variant="h4">Contact Form</Typography>
    <Box className="contact-form" component="form" autocomplete noValidate ref={formRef}>
      
      <button onClick={() => navigate("/")}>Home</button>
    </Box>
    </React.Fragment>
  );
};
