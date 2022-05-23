import { async } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, query, Timestamp, whereEqualTo } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import{useStorage,useDownloadURL} from 'react-firebase-hooks/storage';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Divider,  FlexboxGrid, Form, Schema } from 'rsuite';
import styled from 'styled-components';
import app, { auth, db, signIn, signUp, userSignOut } from '../../firebase';
import {GetImage} from '../../hooks/useDownloadUrl';
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
    const storage = getStorage(app);

const LoginForm = () => {
   const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
   const formRef = React.useRef();
   const [formError, setFormError] = React.useState({});
   const [formValue, setFormValue] = React.useState({
     email: "",
     password: "",
   });
    const HandleSubmit = () => {
      if (!formRef.current.check()) {
        console.error("Form Error");
      }

      const {
        name,
        email,
        role = "User",
        isAdmin = false,
        created_at = Timestamp.now(),
      } = formValue;
      const user = {
        name,
        email,
        role,
        isAdmin,
      };
      signInWithEmailAndPassword(formValue.name, formValue.password).then(
        (user) => {
          sessionStorage.setItem("user", JSON.stringify(user));
        }
      );
    };

    const handleNavigate = () => {
      navigate("/register");
    };

    useEffect( () => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/");
      else if (error) {
        alert = error.message;
        alert.call();
      }
    }, [user, loading, error, navigate]);
  return (
    <React.Fragment>
      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={model}
      >
        <TextFieldLogin
          name="name"
          label="Username"
          style={{
            width: " 100%",
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        />
        <TextFieldLogin
          name="email"
          label="Email"
          style={{
            width: " 100%",
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        />

        <TextFieldLogin
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          style={{
            width: " 100%",
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        />
        <TextFieldLogin
          name="verifyPassword"
          label="Verify password"
          type="password"
          autoComplete="off"
          autoFill="on"
          style={{
            width: " 100%",
            padding: "12px 20px",
            margin: "8px 0",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        />
        <ButtonToolbar>
          <Button
            appearance="primary"
            onClick={HandleSubmit}
            style={{
              color: "white",
              padding: "14px 20px",
              width: "100%",
              margin: "8px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#686868",
            }}
          >
            Submit
          </Button>
          <Divider vertical />
          <Button onClick={handleNavigate}>Sign Up</Button>
        </ButtonToolbar>
      </Form>
    </React.Fragment>
  );
}
export const FullPageLogin = () => {
  
  
  
  const [logo, setLogo] = useState(null);
  const [signInWithEmailAndPassword,user, loading, error] = useSignInWithEmailAndPassword(auth);
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({

    email: "",
    password: "",
  
  });
  const navigate = useNavigate();


  return (
      <LoginDiv>
        {GetImage}
        <img id="logo"></img>
        <FlexboxGrid classPrefix="flexbox-grid-start">
          <FlexboxGrid.Item colspan={12}>
           {<LoginForm />}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}></FlexboxGrid.Item>
      </FlexboxGrid>
      </LoginDiv>
  );
}
const { StringType} = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required.")
  ,
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
});

const TextFieldLogin = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});



export default FullPageLogin;