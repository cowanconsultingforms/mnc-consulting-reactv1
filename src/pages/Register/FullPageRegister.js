import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
  addDoc, collection, serverTimestamp, setDoc, doc
} from "firebase/firestore";
import { ref,getDownloadURL } from "firebase/storage";
import React ,{useState,useEffect,useRef,forwardRef}from "react";
import {  useAuthState} from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import { Button,Container, FlexboxGrid, Form, Input, Schema,Divider } from "rsuite";
import { auth, db, storage,signUp } from "../../firebase";
import { LoginDiv } from "../Login/LoginForm";

const { StringType} = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((Data, data) => {
      console.log(Data);
      console.log(data);

      if (Data !== data.password) {
        return false;
      }

      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
});
const RegisterForm = () => {

  const navigate = useNavigate();
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [logo, setLogo] = useState('');
  const handleSubmit = async() => {
    const { email, password, verifyPassword } = formData;
    try {
       signUp(formData.email, formData.password);
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      localStorage.setItem('user',user);
    })
    return unsubscribe;
  }, [])
  
  return (
    <React.Fragment>
      <img id="logo" alt="logo"></img>
      <FlexboxGrid classPrefix="flexbox-grid-start">
        <FlexboxGrid.Item>
          <Form
            ref={formRef}
            onChange={setFormData}
            onCheck={setFormError}
            formData={formData}
            model={model}
            onSubmit={handleSubmit}
          >
            <TextFieldLogin
              accepter={Input}
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
              accepter={Input}
              name="password"
              label="Password"
              type="password"
              autoComplete="on"
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
              autofill="off"
              accepter={Input}
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

            <Button
              type="submit"
              onClick={handleSubmit}
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
                padding: "30px",
                width: "50%",

                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#686868",
                float: "right",
              }}
            >
              Forgot Password?
            </Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
  );
}
export const FullPageRegister = () => {
 
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const formRef = React.useRef();
  const [image,setImage] = useState('');
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });
  
  

     


    
  
  const handleSubmit = async() => {
    const { email, password, verifyPassword } = formData;
    try {
       signUp(formData.email, formData.password);
    } catch (error) {
      console.log(error);
    }
    
  }
     
    
    
  
  
  const DownloadURL = async () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    getDownloadURL(reference).then((url) => {
//      const xhr = new XMLHttpRequest();
   //   xhr.responseType = 'blob';

  //    xhr.open('GET', url);
    
      const img = document.getElementById('logo');
      img.setAttribute('src', url);
      setImage(url);
    })
      
  }
  useEffect(() => {
    DownloadURL();
    const unsubscribe = onAuthStateChanged(auth, user => {
      localStorage.setItem('user',user);
    })
    return unsubscribe;
  },[])




  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <img id="logo" src={image} alt="logo" />

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
            onChange={setFormData}
            onCheck={setFormError}
            formData={formData}
            model={model}
            onSubmit={handleSubmit}
          >
            <TextFieldLogin
              accepter={Input}
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
              accepter={Input}
              name="password"
              label="Password"
              type="password"
              autoComplete="on"
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
              autofill="off"
              accepter={Input}
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

            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                color: "white",
                padding: "30px",
                width: "100%",

                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#686868",
               
              }}
            >
              Register
            </Button>

            <Button
              onClick={() => navigate("/register")}
              style={{
                color: "white",
                padding: "30px",
                width: "100%",

                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#686868",
                float: "right",
              }}
            >
              Forgot Password?
            </Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};


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
