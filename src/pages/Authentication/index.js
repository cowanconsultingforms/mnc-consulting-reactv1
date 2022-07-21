import React, { useEffect,useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import {Box} from '@mui/material'
import { auth, db,storage } from "../../firebase";
import { LoginForm } from "../../components/Authentication/LoginForm";
import {RegisterForm} from "../../components/Authentication/RegisterForm";
import {NewUserPage} from "../../components/Authentication/NewUserProfile";
import { ref } from "firebase/storage";
import  {ImageBox} from "../../components/Custom/Containers";
import { getDownloadURL } from "firebase/storage";
import './styles.css';
import {useAuth} from "../../context/AuthContext";
import PropTypes from "prop-types";


export const AuthPage = (props) => {
  const navigate = useNavigate();
  const { user,logout } = useAuth();
  if((props.user && props.title)=== 'Login' || (!user && props.title)=== 'Register'){
    navigate('/');
  }else if(user && props.title=== 'Logout'){

  }
  const [reference, loading, error] = useDownloadURL(
    ref(storage, "images/mncdevelopmentlogo.jpg")
  );
  const [image,setImage] = useState('');
  
  const handleFormRender = (title)=>{
    if(props.title === 'Login'){
      return <LoginForm title={props.title} />
    }
    if(props.title === 'Register'){
      return <RegisterForm title={props.title} />
    }
    if(props.title === 'New User Profile'){
      return <NewUserPage title={props.title} />
    }
  }

  useEffect(() => {
    if (props.user) {
      navigate('/account');
    }
  }, [navigate, reference,props.user]);

  return (
    <Box className="auth-page" style={{display:'flex',flexDirection:'column',width:'100%',mt:8}}>
      <ImageBox src={image} id="logo" alt="logo" />
      {handleFormRender(props.title)}
    </Box>
  );
};

AuthPage.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
}
AuthPage.defaultProps = {
  title: 'Login',
  user: {}
}


export default AuthPage;