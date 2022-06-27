import React, { useEffect,useState } from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import {Container} from "rsuite";
import { auth, db,storage } from "../../firebase";
import { LoginForm } from "./LoginForm";
import {RegisterForm} from "./RegisterForm";
import {NewUserPage, NewUserSignUp} from "./NewUserProfile";
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
