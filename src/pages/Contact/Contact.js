import styled from 'styled-components';
import TextField from '../../components/TextField';
import React,{ useState } from 'react';

import { Form ,Input} from 'rsuite';
import { useNavigate } from 'react-router-dom';

const ContactDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: auto;
  max-width: 40%;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);
  z-index:2;
`;

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
  
  const [data, setData] = useState('');
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
      name: "",
      email: "",
      password: "",
    });
  const sendEmail = (name, email, phone, message) => {
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    message = document.getElementById('message').value;
    name = document.getElementById('name').value;

  }
  const onSubmit = (data) => {
    setData(data);
    sendEmail(data.name, data.email, data.phone, data.message);
  }
 
  return (
    <ContactDiv>
      <ContactTop>
        <ContactImg
          src="../public/images/mncdevelopmentlogo.jpg"
          style="width:80%;"
          alt="default.jpg"
        ></ContactImg>
      </ContactTop>
      <ContactBottom>
        <h2>Contact Us</h2>
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="name-9">
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email-9">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="phone
                "
                type="number"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Form.Control rows={5} name="textarea" accepter={Textarea} />
            </Form.Group>

          </Form>
          <ContactButton type="submit">Send</ContactButton>
      
        <script src="https://smtpjs.com/v3/smtp.js"></script>
      </ContactBottom>
    </ContactDiv>
  );
}

export default Contact;