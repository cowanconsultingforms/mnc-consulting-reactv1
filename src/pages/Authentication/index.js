import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box} from '@mui/material'
import { auth, db,storage } from "../../firebase";
import { LoginForm } from "../../components/Authentication/LoginForm";
import {RegisterForm} from "../../components/Authentication/RegisterForm";
import {NewUserProfile} from "../../components/Authentication/NewUserProfile";
import { ref } from "firebase/storage";
import  {ImageBox} from "../../components/Custom/Containers";
import './styles.css';
import PropTypes from "prop-types";
import MNCLogo from "../../components/Constants/MNCLogo";


export const AuthPage = (props) => {
  const navigate = useNavigate();


  const [image,setImage] = useState('');
  
  const handleFormRender = (title)=>{
    if(props.title === 'Login'){
      return <LoginForm title={props.title} />
    }
    if(props.title === 'Register'){
      return <RegisterForm title={props.title} />
    }
    if(props.title === 'New User Profile'){
      return <NewUserProfile title={props.title} />
    }
  }

  useEffect(() => {
      if (
        (props.user && props.title) === "Login" ||
        (props.user && props.title) === "Register"
      ) {
        navigate("/");
      } else if (props.user && props.title === "Logout") {
      }
  }, [navigate,props.user,props.title]);

  return (
    <Box className="auth-page" style={{display:'flex',flexDirection:'column',width:'100%',mt:8}}>
      <MNCLogo />
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