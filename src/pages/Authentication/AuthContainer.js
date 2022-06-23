import { onAuthStateChanged,signInWithUsernameAndPassword } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import {useAuthState,signInWithEmailAndPassword} from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import {ButtonToolbar,Container,Divider,FlexboxGrid,Loader,Schema} from "rsuite";
import { auth, db } from "../../firebase";
import { useForm ,Controller,useController} from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AuthPage = ({title}) => {
  const navigate = useNavigate();
  const [authState, authLoading, authError] = useAuthState(auth);
  const [reference, loading, error] = useDownloadURL(
    ref(storage, "images/mncdevelopmentlogo.jpg")
  );
  const handleAction = (title) => {
    if(title==='login'){
      try{
      signIn(data.email,data.password)
    }catch(e){
      console.log(e)
      }
    }
    if (id === 2) {
      signUp( data.email, data.password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          console.log(response);
          navigate('/');  
      })
   }
}
  const formRef = useRef();
  const handleFormRender = (id)=>{
    if(title === 'Login'){
      return <LoginForm />
    }
    if(title === 'Register'){
      return <SignUpForm />
    }
  }


  const handleNavigate = () => {
    navigate("/");
  };
  const renderLogo = () => {
    return <ImageBox src={reference} />
  }
  useEffect(() => {
    if (authState) {
      navigate("/");
    } else {
      formRef.current = formValue;
      renderLogo();
    }
  }, [authState, navigate, reference]);

  return (
    <Container className="login-page">
      <img src={renderLogo} id="logo" alt="logo" />
      {renderForm}
    </Container>
  );
};

const Input = ({label,register,required}) => ( 
  <React.Fragment>
  <label> {label} </label> <input {...register(label, {required})}/> 
  </React.Fragment>
);
