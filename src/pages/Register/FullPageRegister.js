import {
  addDoc, collection, serverTimestamp, setDoc, Timestamp
} from "firebase/firestore";
import { ref } from "firebase/storage";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import { Button, ButtonToolbar, Container, FlexboxGrid, Form, Schema } from "rsuite";
import { auth, db, storage,signUp } from "../../firebase";
import { LoginDiv } from "../Login/LoginForm";


const { StringType} = Schema.Types;


const model = Schema.Model({
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
  const navigate = useNavigate();
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
   
    email: "",
    password: "",
    verifyPassword: "",
  });
  
  
  const auditLogger = async({action="Created Account"}) => {
    const user = auth.currentUser;
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = Timestamp.now();
    const docRef = collection("auditLogs").doc();
    await setDoc(docRef, { action, userName,uid ,timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
    }
     
 

    
  
  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      console.error(formError);
    } else {
      console.log(formValue);
      const {  email, password,verifyPassword} = formValue;
   
      signUp(formValue.email, formValue.password).then((userCredential) => {
        const currentUser = userCredential.user;
        
           const user = {
             email : currentUser.email,
             role :'regular',
             uid : currentUser.uid,
             created_at : serverTimestamp(),
        };
        localStorage.setItem("user", JSON.stringify(user));
        user.uid =currentUser.uid;
        addDoc(collRef, user).then((docRef) => {
          auditLogger(user);
          console.log(docRef);
         
         });
      }, (error) => { 
        console.log(error);
      });
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
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {DownloadURL()}
        </Container>
        <FlexboxGrid
          classPrefix="login-flex"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FlexboxGrid.Item colspan={24} style={{alignItems:'stretch'}}>
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
                placeholder="Enter your email"
                style={{
                  fontWeight: "bold",
                  width: " 400px",
                  padding: "12px 20px",
                  margin: "8px 0",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  outline: "none",
                  justifyContent: "center",
                }}
              />
                
              <TextFieldLogin
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                style={{
                  fontWeight: "bold",
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
              <Container style={{ display: "flex" }}>
                <Button
                  onClick={HandleSubmit}
                  style={{
                    color: "white",
                    padding: "30px",
                    width: "50%",

                    border: "2px solid #ccc",
                    cursor: "pointer",
                    backgroundColor: "#686868",
                    float: "left",
                  }}
                >
                  Register
                </Button>

                <Button
                  onClick={() => navigate("/register")}
                  style={{
                    color: "white",
                    padding: "14px 20px",
                    width: "50%",

                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#686868",
                    float: "right",
                  }}
                >
                  Forgot Password?
                </Button>
              </Container>
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
