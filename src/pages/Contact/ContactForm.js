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
      <TextField name="name" label="Name" variant="outlined" />
      <TextField name="email" label="Email" variant="outlined" />
      <TextField name="message" label="Message" variant="outlined" />
      <TextField name="phone" label="Phone" variant="outlined" />
      <Button onClick={() => navigate("/")}>Home</Button>
    </Box>
    </React.Fragment>
  );
};
