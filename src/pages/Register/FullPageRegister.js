import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc, collection, serverTimestamp, setDoc, doc,toJson
} from "firebase/firestore";
import { ref } from "firebase/storage";
import React ,{useState,useEffect}from "react";
import { useAuthState,useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import { Button,Container, FlexboxGrid, Form, Input, Schema } from "rsuite";
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
  
  const [user,loading,error] = useCreateUserWithEmailAndPassword(auth,formValue.email,formValue.password);
  const auditLogger = async ({ action = "Created Account", user, userName, uid, timestamp }) => {
    user = auth.currentUser;
    
    const docData = {
      user: auth.currentUser.email.split("@")[0],
      userName: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      timestamp: serverTimestamp(),
      action,
    }
  const docRef = doc(db, "auditLogs");
    await addDoc(docRef, docData).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
    }
     


    
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current.check()) {
      console.error(formError);
    } else {
      console.log(formValue);
      createUserWithEmailAndPassword(auth,formValue.email, formValue.password).then((userCredential) => {
       
        const currentUser = userCredential.user 
        console.log(currentUser.toJSON())
           const user = {
             email : userCredential.user.displayName(),
             role :'regular',
             uid : userCredential.user.uid,
             created_at: serverTimestamp(),
             userName: userCredential.user.displayName().split("@")[0]
        };
        const userRef = doc(db, "users", user.uid).withConverter(userConverter);
        setDoc(userRef, new User(user.email,user.userName,user.uid,user.role,user.created_at)).withConverter().then(() => {
          localStorage.setItem("user", JSON.stringify(user));
        })
        
        addDoc(userRef,user).then((docRef) => {
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

  useEffect(() => {

  })




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
          <FlexboxGrid.Item colspan={24} style={{ alignItems: "stretch" }}>
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
                onChange={setFormValue}
                onCheck={setFormError}
                accepter={Input}
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
                accepter={Input}
                onChange={setFormValue}
                onCheck={setFormError}
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
                autofill="on"
                accepter={Input}
                onChange={setFormValue}
                onCheck={setFormError}
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
              <Container style={{ display: "flex",flexDirection:'row' }}>
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
  class User {
    constructor(email, userName, uid, role, created_at) {
      this.email = email;
      this.userName = userName;
      this.uid = uid;
      this.role = role;
      this.created_at = created_at;
    }
    toString() {
      return JSON.stringify(this);
    }
  }
  const userConverter = {
    toFirestore: (user) => {
      return {
        email: user.email,
        userName: user.userName,
        uid: user.uid,
        role: user.role,
        created_at: user.created_at,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(
        data.email,
        data.userName,
        data.uid,
        data.role,
        data.created_at
      );
    },
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
