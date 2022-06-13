import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState,useRef,forwardRef } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useNavigate } from 'react-router-dom';
import {  ButtonToolbar, Divider, FlexboxGrid, Form, Loader, Schema } from 'rsuite';
import styled from 'styled-components';
import  { auth, storage } from '../../firebase';
import { ref } from 'firebase/storage';
import './styles.css';
export const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 75%;
    padding-top:10%;
    padding-left:25%;
    `
export const LoginButton = styled.button`
    color: white;
    padding: 14px 20px;
    width: 100%;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    background-color: #686868;
    font-size: 18px;
    text-decoration: none;`
const LoginButtonRef = forwardRef((props, ref) => {
  return <LoginButton ref={ref} {...props} />;

});


//Login Form used by code
export const LoginForm = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
     email: "",
     password: ""
  
   });
  const HandleSubmit = async(e) => {
    e.preventDefault();
      if (!formRef.current.check()) {
        console.error("Form Error");
      }

      const {email,password} = formValue;
     
    signInWithEmailAndPassword(formValue.email, formValue.password).then(
      (res) => {
        const user = res.data();
        console.log(JSON.stringify(user));
        sessionStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('userToken', JSON.stringify(user));
        navigate('/');
      });
        }
      
    

    const handleNavigate = () => {
      navigate("/register");
    };

    useEffect( () => {
      if (loading) {
      
        return (
          <React.Fragment>
            <div>
              <Loader />
            </div>
          </React.Fragment>
        );
      }
      if (user) navigate("/");
      else if (error) {
        alert = error.message;
        alert.call();
      }
    }, [user, loading, error,navigate]);
  return (
    <div className="LoginForm">
      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={model}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <TextFieldLogin
          name="email"
          label="Email"
          type="email"
          ref={formRef}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        />

        <TextFieldLogin
          name="password"
          label="Password"
          type="password"
          ref={formRef}
          value={formValue}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
            textDecoration: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <ButtonToolbar alignItems="center" justifyContent="center" style={{display:'flex',width:'80%',spaceBetween:'1px',padding:'5px',border:'5px'}}>
          <LoginButtonRef
            className="login-button"
            onClick={HandleSubmit}
            type="submit"
            style={{
              color: "white",
              padding: "14px 20px",
              border: '2px',
              margin: "8px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            
              
            }}
          >
            Sign in
          </LoginButtonRef>
          <Divider />
          <LoginButtonRef
            className="register-button"
            onClick={handleNavigate}
            ref={formRef}
            style={{
              color: "white",
              padding: "14px 20px",
              width:'50%',
              margin: "8px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#686868",
            }}
          >
            Register Here
          </LoginButtonRef>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

//a different version of the same form, not configured
export const FullPageLogin = () => {
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const DownloadURL = () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    const [value, loading, error] = useDownloadURL(reference);
    
    return (
      <div>
        <p>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Download URL: Loading...</span>}
          {!loading && value && (
            <React.Fragment>
              <img src={value} alt="logo"></img>
            </React.Fragment>
          )}
        </p>
      </div>
    ), [value, loading, error]}; 
  const RenderLogin = () => {
    return (
      <React.Fragment>
      <LoginForm />
      </React.Fragment>
    )
  }
  
  return (
      <div className="login-div">
      {<DownloadURL />}
        <img id="logo" alt="logo"></img>
        <FlexboxGrid classPrefix="flexbox-grid-start">
          <FlexboxGrid.Item colspan={6}>
           {RenderLogin}
          </FlexboxGrid.Item>
         
      </FlexboxGrid>
      </div>
  );
}

//model for Form Schema - check rsuite documentation for more info
const { StringType} = Schema.Types;

const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required.")
  ,
  password: StringType().isRequired("This field is required."),
});


//custom ref forwarding object for form logic
const TextFieldLogin = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});



export default LoginForm;