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

const LoginPage = () => {
  const navigate = useNavigate();
  const [authState, authLoading, authError] = useAuthState(auth);
  const [reference, loading, error] = useDownloadURL(
    ref(storage, "images/mncdevelopmentlogo.jpg")
  );
 
  const {register,handleSubmit,formState: {errors}} = useForm({
      defaultValues: {
        email: "",
        password: ""
      }});
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleAction = (id) => {
    
    if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          console.log(response);
          navigate('/');  
      })
   }
}
  const formRef = useRef();
    const onSubmit = () =>{
    signInWithUsernameAndPassword = async () => {
      // basic client side auth // firebase login functionality
      try {
        const res = await signInWithEmailAndPassword(auth,data.email, data.password);
        console.log(res); // add alert for success // add ui functionalities on successful login
      } catch (error) {
        console.log(error); // add alert for error
      }
    };
    };
  const renderButton = () => {
    return (
      <LoginButtonRef
        className="register-button"
        onClick={handleNavigate}
        ref={formRef}
      >
        Register Here
      </LoginButtonRef>
    );
  };
  const renderForm = () => {
    return (
      <Controller>
      <form
        onSubmit={handleSubmit((data)=>{
          alert(JSON.stringify(data))
        })}>
        <Input label="Email" name="email" {...register('email'), { required: true, maxLength: 40 }} onChange={e=>e.target.value } />
        <Input
          label="Password"
          name="password"
          onChange={e=>e.target.value}
          {...register('password', { required: true })}
        />

        <ButtonToolbar.Button color="green" appearance="primary" type="submit">
          Login
        </ButtonToolbar.Button>
        <ButtonToolbar.Button
          color="red"
          appearance="subtle"
          onClick={handleNavigate}
        >
          Cancel
        </ButtonToolbar.Button>
        </form>
        </Controller>
    );
  };

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
  <>
  <label> {label} </label> <input {...register(label, {required})}/> 
  </>
);
