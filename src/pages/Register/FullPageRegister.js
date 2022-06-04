import {
  addDoc, collection, setDoc, Timestamp
} from "firebase/firestore";
import { ref } from "firebase/storage";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import { Button, ButtonToolbar, Container, FlexboxGrid, Form, Schema } from "rsuite";
import { auth, db, storage } from "../../firebase";
import { LoginDiv } from "../Login/LoginForm";


const { StringType} = Schema.Types;

function asyncCheckUsername(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (name === "abc") {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 500);
  });
}

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
  
  
  const auditLogger = () => {
    const action = "Created Account";
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = Timestamp.now();
    const docRef = collection("auditLogs").doc(uid);
    setDoc(docRef, { action, userName,uid ,timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
    }
     
 

    
  
  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      console.error(formError);
    } else {
      console.log(formValue);
      const {  email, role= 'User' ,created_at = Timestamp.now(),uid} = formValue;
      const user = {
        email,
        role,
        uid,
        created_at
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

  




  return (
    <React.Fragment>
      <div className="LoginForm">
        <Container style={{display:'flex',flexDirection:'column'}}>
          {DownloadURL()}
          <img id="logo" alt="logo"></img>
        </Container>
        <FlexboxGrid classPrefix="flexbox-grid-start">
          <FlexboxGrid.Item colspan={12}>
            <Form
              ref={formRef}
              onChange={setFormValue}
              onCheck={setFormError}
              formValue={formValue}
              model={model}
              onSubmit={HandleSubmit}
            >
              <TextFieldLogin
                name="email"
                label="Email"
                value={formValue}
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
                  onClick={HandleSubmit}
                  style={{
                    color: "gray",
                    padding: "14px 20px",
                    width: "50%",
                    margin: "8px 0",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#686868",
                  }}
                >
                  Submit
                </Button>

                <Button onClick={() => navigate("/register")}>
                  Forgot Password?
                </Button>
              </ButtonToolbar>
            </Form>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}></FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
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
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

export default FullPageRegister;
