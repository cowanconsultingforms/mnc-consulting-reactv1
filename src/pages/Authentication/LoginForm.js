import React,{useState,useEffect,createRef} from "react";
import {Box,TextField,FormControlLabel,Checkbox} from '@mui/material';
import { auth,db,signIn } from "../../firebase";
import { CustomButton } from "../../components/Custom/Buttons";
import { useNavigate } from "react-router-dom";
import {ButtonGroup,Button} from '@mui/material';
export const LoginForm = ({title}) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [data,setData] = useState({
    email: "",
    password: "",
  })
  
  const formRef = createRef();
  const handleAction = async() => {
    try {
      await signIn(email, password).then((res) => {
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
        component="form"
        autocomplete={true}
        noValidate
        onSubmit={handleAction}
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
         onChange={(e) => setPassword(data.password = e.target.value)} 
         autoFocus
         fullWidth={true}
         required
         margin="normal"
         type="password"
         value={data.password}
         />
         <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          <ButtonGroup>
        <Button handleAction={handleAction} component="form" key="Login">Login</Button>
        <Button onClick={handleNavigate}>Register</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};