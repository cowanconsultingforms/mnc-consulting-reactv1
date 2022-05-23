import React, { useState, useEffect } from "react";
import { db, auth, userSignOut, signIn, signUp, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "../../components/TextField";
import { FlexboxGrid,Schema, } from "rsuite";
import { LoginDiv, LoginButton } from "../Login/FullPageLogin";
import { getDownloadURL, ref } from "firebase/storage";
import {
  collection,
  getDocs,
  querySnapshot,
  query,
  getFirestore,
  DocumentReference,
  setDoc,
  serverTimestamp,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuthState,useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, ButtonToolbar } from "rsuite";
import { useDownloadURL } from "react-firebase-hooks/storage";


const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
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

export const FullPageRegister = () => {
  
  const collRef = collection(db, "users");
  
  const [createUserWithEmailAndPassword,user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  
  
  const auditLogger = (user) => {
    const action = "Created Account";
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = Timestamp.now();
    const docRef = getFirestore().collection("auditLogs").doc();
    setDoc(docRef, { action, userName,uid, timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
    }
     
 

    
  
  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
    } else {
      console.log(formValue);
      const {  email, role= 'User' , isAdmin =false,created_at = Timestamp.now(),uid} = formValue;
      const user = {
        email,
        role,
        isAdmin,
        uid
      };
      createUserWithEmailAndPassword(auth, formValue.name, formValue.password).then((newUser) => {

        user.uid =newUser.uid;
        addDoc(collRef, user).then((docRef) => {
          auditLogger(user);
          console.log(docRef);
          sessionStorage.setItem("user", JSON.stringify(docRef));
         });
      },[user,loading,error]);
    }
  };
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
    )
  };
  const handleCheckEmail = () => {
    formRef.current.checkForField("email", (checkResult) => {
      console.log(checkResult);
    });
  };

  




  return (
    <React.Fragment>
        {DownloadURL()}
        <img id="logo"></img>
        <FlexboxGrid classPrefix="flexbox-grid-start">
          <FlexboxGrid.Item colspan={12}>
            <Form
              ref={formRef}
              onChange={setFormValue}
              onCheck={setFormError}
              formValue={formValue}
              model={model}
            >

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
                  
                    color: "gray",
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

                <Button onClick={handleCheckEmail}>Check Email</Button>
              </ButtonToolbar>
            </Form>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}></FlexboxGrid.Item>
        </FlexboxGrid>
    </React.Fragment>
  );
};

export const RegisterPage = () => {
  
  return (
    <LoginDiv>
    
    </LoginDiv>  
  )
}

const TextFieldLogin = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

export default FullPageRegister;
