import React,{useState,useEffect,createRef} from "react";
import {Box,TextField,FormControlLabel,Checkbox} from '@mui/material';
import { auth,db,signIn } from "../../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import { CustomButton } from "../../components/Custom/Buttons";
import { useNavigate } from "react-router-dom";
import {ButtonGroup,Button} from '@mui/material';
import './styles.css';
import {LandingFooter} from '../Home/Footer';



export const LoginForm = ({title}) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [data,setData] = useState({
    email: "",
    password: "",
  })
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email, password).then((res) => {
        if (res) {
          const user = auth.currentUser.uid;
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

  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {

    }
  , []);
  return (
    <div className="login-form">
    <h1>{title} Form</h1>
      <Box
      className="login-form-box"
        component="form"
        autocomplete={true}
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column",marginTop:'20px',paddding:'20px' }}
      >
        <TextField
        className="form-text-field"
         id="email"
         label="Email :"
         variant="outlined"
         onChange={(e) => setEmail(data.email =e.target.value)} 
         autoComplete="email"
         autoFocus
         fullWidth={true}
         required
         margin="normal"
         value={data.email}
         />
         <TextField
         id="password"
         label="Password :"
         variant="outlined"
         autoComplete="current-password"
         onChange={(e) => setPassword(data.password = e.target.value)} 
         autoFocus
         fullWidth={true}
         required
         margin="normal"
         type="password"
         value={data.password}
         />
          <ButtonGroup sx={{m:5,alignItems:'center'}}>
        <Button  key="Login" variant="contained" type="submit" sx={{backgroundColor:'gray'}}>Login</Button>
        <Button key="Register" onClick={handleNavigate} variant="contained">Register</Button>
        </ButtonGroup>
      </Box>
      <LandingFooter />
    </div>
  );
};