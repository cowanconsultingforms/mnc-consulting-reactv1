import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Box, Typography, Button } from "@mui/material";
import { DownloadLogo } from "./DownloadLogo";

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
    <Box
      className="contact-container"
      sx={{ marginTop: "10%", width: "80%", justifyContent: "center" }}
    >
      <DownloadLogo />

      <Typography
        variant="h2"
        sx={{
          marginTop: "300px",
          color: "black",
          alignItems: "center",
          fontFamily: "Garamond",
        }}
      >
        Contact Us
      </Typography>

      <Button type="submit">Send Message</Button>

      <script src="https://smtpjs.com/v3/smtp.js"></script>
    </Box>
  );
};
export default Contact;
