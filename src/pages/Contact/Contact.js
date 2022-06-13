import styled from 'styled-components';
import TextField from '../../components/Custom/TextField';
import React,{ useState,forwardRef,useRef } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { Container, Form ,Input,Button,Loader} from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { TextFieldLogin } from '../../components/Custom/TextField';
import { ImageBox } from '../../components/Custom/Containers';
import { storage } from '../../firebase';
import { ref as reff, downloadURL } from 'firebase/storage';
import './styles.css';

const ContactTop = styled.div`
background-size:cover;
box-sizing:border-box;
float:top;
height:50%;


`
const ContactImg = styled.img`
  width: 80%;
  float:top;
  margin-top:10px;
  `;
const ContactBottom = styled.div`
  position: relative;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 80%;
  width: 40%;
  border-radius: 2px;
  background-color: #818d86;
  float:bottom;
`;

const ContactButton = styled.button`
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #a9b1ac;
    color: #fff;
    font-size: 1.1rem;
    border: none;
    outline: none;
    cursor: pointer;
    transition: .3s;`
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));


const Contact = () => {
  const reference = reff(storage, "images/mncdevelopmentlogo.jpg");
  const [value, loading, error] = useDownloadURL(reference);

  const DownloadURL = () => {
    
      

      return (
        (
          <React.Fragment>
           
            
              { (
                <React.Fragment>
                {loading && <Loader size="md" content="Loading..." />}
                    <ImageBox
                      id="logo"
                      src={value}
                      alt="logo"
                      style="justify-content:center;align-items:center;"
                    ></ImageBox>
      
                </React.Fragment>
              )}
      
          </React.Fragment>
        ),
        [value, loading, error]
      );
  };
  return (
    <Container className="contact-box">
     
        <img src={DownloadURL()} alt="logo" />
      <ContactForm />
 
    </Container>
  );
}
const ContactForm = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const formRef = useRef();
    const [formValue, setFormValue] = useState({
      name: "",
      email: "",
      message: "",
      phone: "",
    });
    const sendEmail = ({name,email,message,phone}) => {
      email = data.email;
      phone = data.phone
      message = data.message;
      name =data.name;
  

/*  Email.send({
    Host: "smtp.gmail.com",
    Username: "slimmyyimmy1@gmail.com",
    Password: "yjuqmfklixryjpna",
    To: "slimmyyimmy1@gmail.com",
    From: "slimmyyimmy1@gmail.com",
    Subject: `Message from ${name} | MNCDevelopment`,
    Body: `Name: ${name}<br>Email: ${email}<br>Phone: ${phone}<br>Message: ${message}`
  }).then((message) => alert("Mail Sent! Response times vary from 24 - 48 Hours!")); */
}
    const onSubmit = (data) => {
      setData(data);
      sendEmail(data.name, data.email, data.phone, data.message);
    };
  return (
    <Container
      className="contact-container"
      fluid="true"
      justify="center"
      style={{ marginTop: "10%", width: "80%", justifyContent: "center" }}
    >
      <h2>Contact Us</h2>

      <Form
        fluid
        onChange={setFormValue}
        formValue={formValue}
        className="main-contact-form"
        layout="horizontal"
      >
        <Form.Group controlId="contact-form" className="main-contact-form">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="contact-name" accepter={Input} />
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="contact-email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" accepter={Input} />
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="contact-phone">
          <Form.ControlLabel>Phone Number</Form.ControlLabel>
          <Form.Control
            name="phone"
            type="number"
            autoComplete="off"
            accepter={Input}
          />
        </Form.Group>
        <Form.Group controlId="contact-textarea">
          <Form.ControlLabel>Message</Form.ControlLabel>
          <Form.Control rows={5} name="textarea" accepter={Textarea} />
        </Form.Group>
      </Form>
      <Button type="submit" className="contact-button">
        Send
      </Button>

      <script src="https://smtpjs.com/v3/smtp.js"></script>
    </Container>
  );
}
export default Contact;