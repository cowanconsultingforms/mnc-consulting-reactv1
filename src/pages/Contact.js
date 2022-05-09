import styled from 'styled-components';
import TextField from '../components/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './public/images/mncdevelopmentlogo.jpg';
import { TextArea } from '../components/TextField';

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


const Contact = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  const sendEmail = (name, email, phone, message) => {
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    message = document.getElementById('message').value;
    name = document.getElementById('name').value;

  }
 
  return (
      <ContactDiv>
        <ContactTop>
          <ContactImg
            src="./public/images/mncdevelopmentlogo.jpg"
            style="width:80%;"
            alt="default.jpg"
          ></ContactImg>
        </ContactTop>
        <ContactBottom>
          <h2>Contact Us</h2>
          <form
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))&& sendEmail()}
          >
          <TextField placeholder={'Name'} value={(e) => e.target.value} canEdit id="name" {...register(value)}/>
            <TextField placeholder={'Email'} value={(e) => e.target.value} canEdit type="email" id="email" {...register(value)} />
            <TextField placeholder={'Phone Number(Recommended)'} value={(e) => e.target.value} canEdit type="text" {...register(phone)} />
            <TextArea placeholder={'Message'} value={(e) => e.target.value} onChange={(e)=> e.target.value} id="message" {...register(message)} />
            <ContactButton type="submit">Send</ContactButton>
          </form>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
        </ContactBottom>
      </ContactDiv>
    );
}

export default Contact;