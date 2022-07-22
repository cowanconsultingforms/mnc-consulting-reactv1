import React, { useEffect,useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import {Box} from '@mui/material'
import { auth, db,storage } from "../../firebase";
import { LoginForm } from "../../components/Authentication/LoginForm";
import {RegisterForm} from "../../components/Authentication/RegisterForm";
import {NewUserProfile} from "../../components/Authentication/NewUserProfile";
import { ref } from "firebase/storage";
import  {ImageBox} from "../../components/Custom/Containers";
import { getDownloadURL } from "firebase/storage";
import './styles.css';
import { useContext } from "react";
import {useAuth} from "../../context/AuthContext";
import PropTypes from "prop-types";



AuthPage.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
}
AuthPage.defaultProps = {
  title: 'Login',
  user: {}
}
export const AuthPage = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if(user && title === 'Login' || title === 'Register'){
    navigate('/');
  }else if(user && title === 'Logout'){

  }
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
  
    if (user) {
      navigate('/account');
    }else{
      DownloadURL();
    }
  }, [navigate, reference]);

  return (
    <Box className="auth-page" style={{display:'flex',flexDirection:'column',width:'100%',mt:8}}>
      <ImageBox src={image} id="logo" alt="logo" />
      {handleFormRender(title)}
    </Box>
  );
};

export default AuthPage;