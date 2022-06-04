import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, query, Timestamp, whereEqualTo } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDownloadURL, useStorage } from 'react-firebase-hooks/storage';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Divider, FlexboxGrid, Form, Loader, Schema } from 'rsuite';
import styled from 'styled-components';
import app, { auth, db, signIn, signUp, userSignOut ,storage} from '../../firebase';
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
const LoginButtonRef = React.forwardRef((props, ref) => {
  return <LoginButton ref={ref} {...props} />;

});
export const LoginForm = () => {
   const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
   const formRef = React.useRef();
   const [formError, setFormError] = React.useState({});
   const [formValue, setFormValue] = React.useState({
     email: "",
     password: ""
  
   });
    const HandleSubmit = () => {
      if (!formRef.current.check()) {
        console.error("Form Error");
      }

      const {email,password} = formValue;
     
      signInWithEmailAndPassword(formValue.email, formValue.password).then(
        (res) => {
          const { uid = res.uid, role='regular', isAdmin=false, userName =  res.data().displayName()} = user;
          console.log(user);
          const loggedInUser = sessionStorage.setItem('user', JSON.stringify(res));
   
          localStorage.setItem('user', JSON.stringify(user));
          return (
            <React.Fragment>
              <div>
                <p>
                  Welcome {user.email}
                </p>
              </div>
            </React.Fragment>
          )
        }
      );
    };

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
    }, [user, loading, error, navigate]);
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
          width:'50%',
        }}
      >
        <TextFieldLogin
          name="email"
          label="Email"
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
          }}
        />
        <ButtonToolbar alignItems="center" justifyContent="center">
          <LoginButtonRef
            onClick={HandleSubmit}
            type="submit"
            style={{
              color: "white",
              padding: "14px 20px",
            
              margin: "8px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#686868",
              
            }}
          >
            Sign in
          </LoginButtonRef>
          <Divider />
          <LoginButtonRef onClick={handleNavigate} ref={formRef}>
            Register Here
          </LoginButtonRef>
        </ButtonToolbar>
      </Form>
    </div>
  );
}
export const FullPageLogin = () => {
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const DownloadURL = () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    const [value, loading, error] = useDownloadURL(reference);
    const navigate = useNavigate();
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
  useEffect = (() => {
 
    if (!loading && user && !error) {
      navigate("/");
    }
  },[user,loading,error])
  
  return (
      <LoginDiv>
      {<DownloadURL />}
        <img id="logo"></img>
        <FlexboxGrid classPrefix="flexbox-grid-start">
          <FlexboxGrid.Item colspan={12}>
           {RenderLogin}
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



export default LoginForm;