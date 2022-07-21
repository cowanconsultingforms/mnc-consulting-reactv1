import {
  Box,
  Typography,
  Button,
  TextField,
  ButtonGroup,
  TextareaAutosize,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(196 196 196)' : 'rgb(196 196 196)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export const ContactForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      message,
    };
  };
  const navigate = useNavigate();
  const formRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Stack
      className="contact-form"
      component="div"
    >
      <Item>
        <Typography variant="h4" sx={{ fontFamily: 'Garamond', alignItems: 'center', justifyContent: 'center' }}>
          Contact Form
        </Typography>
      </Item>
      <Item
        className="contact-form"
        component="form"
        autoComplete="true"
        noValidate
        ref={formRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          border: "2px solid black",
          borderRadius: "5px",
          width: "75%",
          fontFamily: "Garamond",
          height: "fit-content",
        }}
      >
        <TextField
          name="name"
          label="Name"
          sx={{fontFamily:'Garamond',background:'white',width:'50%'}}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
         
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="phone"
          label="Phone"
       
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextareaAutosize
          name="message"
          label="Message"
        
          onChange={(e) => setMessage(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={handleSubmit} >Send Message</Button>
          <Button onClick={() => navigate("/")}>Home</Button>
        </ButtonGroup>
      </Item>
    </Stack>
  );
};

export default ContactForm;