import React ,{useState,useEffect,useRef}from "react";
import {Box,TextField} from '@mui/material';
import { auth,db,signUp } from "../../firebase";
import { CustomButton } from "../../components/Custom/Buttons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from '@mui/material';
import { useNavigate } from "react-router-dom";


export const RegisterForm = ({title}) => {

  const [data,setData] = useState({
    email:"",
    password:"",
    password2:"",
  });
  const navigate = useNavigate();
  const formRef = useRef();

  const handleAction = () => {
    if (data.password === data.password2) {
    try {
      signUp(data.email, data.password).then((res) => {
        if (res) {
          const user = auth.currentUser;
          console.log(JSON.stringify(user));
          sessionStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userToken", JSON.stringify(user));
          navigate("/");
        }
      });
    } catch (error) {
        console.log(error);
    }
  };
}

  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {

    }
  , []);
  return (
    <div className="register-form">
      <Box
        component="form"
        autocomplete={true}
        noValidate
        ref={formRef}
        onSubmit={handleAction}
      >
        <TextField
         id="email"
         label="Email :"
         variant="outlined"
         onChange={(e) => setData(e.target.value)} 
         />
         <TextField
         id="password"
         label="Password :"
         variant="outlined"
         onChange={(e) => setData(e.target.value)} 
         />
        <CustomButton title={title} handleAction={handleAction}></CustomButton>
      </Box>
    </div>
  );
};

export default RegisterForm;