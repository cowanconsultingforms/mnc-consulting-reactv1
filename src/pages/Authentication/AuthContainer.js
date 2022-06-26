import { onAuthStateChanged,signInWithUsernameAndPassword } from "firebase/auth";
import React, { useEffect, useRef,useState,createRef } from "react";
import {useAuthState,signInWithEmailAndPassword} from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import {ButtonToolbar,Container,Divider,FlexboxGrid,Loader,Schema} from "rsuite";
import { auth, db,storage } from "../../firebase";
import { useForm ,Controller,useController} from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoginForm } from "./LoginForm";
import {RegisterForm} from "./RegisterForm";
import {NewUserPage} from "./NewUserProfile";
import { ref } from "firebase/storage";
import  {ImageBox} from "../../components/Custom/Containers";
import { getDownloadURL } from "firebase/storage";
import './styles.css';


export const AuthPage = ({title}) => {
  const navigate = useNavigate();
  const [authState, authLoading, authError] = useAuthState(auth);
  const [reference, loading, error] = useDownloadURL(
    ref(storage, "images/mncdevelopmentlogo.jpg")
  );
  const [image,setImage] = useState('');
  
  const handleFormRender = (title)=>{
    if(title === 'Login'){
      return <LoginForm title={title} />
    }
    if(title === 'Register'){
      return <RegisterForm title={title} />
    }
    if(title === 'New User Profile'){
      return <NewUserPage title={title} />
    }
  }
  const DownloadURL = async () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    getDownloadURL(reference).then((url) => {
//      const xhr = new XMLHttpRequest();
   //   xhr.responseType = 'blob';

  //    xhr.open('GET', url);
    
      const img = document.getElementById('logo');
      img.setAttribute('src', url);
      setImage(url);
    })}

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
      DownloadURL();
    
  }, [authState, navigate, reference]);

  return (
    <Container className="auth-page" style={{display:'flex',flexDirection:'column',width:'100%',mt:8}}>
      <ImageBox src={image} id="logo" alt="logo" />
      {handleFormRender(title)}
    </Container>
  );
};
