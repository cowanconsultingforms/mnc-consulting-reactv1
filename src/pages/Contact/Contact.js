import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Box, Typography, Button,Stack,styled,Paper } from "@mui/material";
import { DownloadLogo } from "./DownloadLogo";
import { ContactForm } from "./ContactForm";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Contact = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const formRef = useRef();

  const sendEmail = ({ name, email, message, phone }) => {
    email = data.email;
    phone = data.phone;
    message = data.message;
    name = data.name;

    /*  Email.send({
    Host: "smtp.gmail.com",
    Username: "slimmyyimmy1@gmail.com",
    Password: "yjuqmfklixryjpna",
    To: "slimmyyimmy1@gmail.com",
    From: "slimmyyimmy1@gmail.com",
    Subject: `Message from ${name} | MNCDevelopment`,
    Body: `Name: ${name}<br>Email: ${email}<br>Phone: ${phone}<br>Message: ${message}`
  }).then((message) => alert("Mail Sent! Response times vary from 24 - 48 Hours!")); */
  };
  const onSubmit = (data) => {
    setData(data);
    sendEmail(data.name, data.email, data.phone, data.message);
    navigate("/")
  };
  return (
    <Stack
      className="contact-container"
      component="div"
      sx={{ marginTop: "5%",marginLeft:'10%', width: "80%", justifyContent: "center",alignItems:'center' }}
    >
      <Item sx={{margin:'5%'}}><DownloadLogo /></Item>
      <Stack component="div"
      sx={{m:'5',justifyContent:'center',alignItems:'center',maxHeight:'100%'}}>
      <ContactForm onSubmit={onSubmit} />
      </Stack>
     

      <script src="https://smtpjs.com/v3/smtp.js"></script>
    </Stack>
  );
};
export default Contact;
