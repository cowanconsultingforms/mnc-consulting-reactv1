import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { ImageBox } from "../../components/Custom/Containers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {CustomButton} from '../../components/Custom/Buttons';
import { ButtonGroup,Button } from "rsuite";

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 75%;
  padding-top: 10%;
  padding-left: 25%;
`;
export const LoginButton = styled.button`
  color: white;
  padding: 14px 20px;
  width: 100%;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  background-color: #686868;
  font-size: 18px;
  text-decoration: none;
`;
const LoginButtonRef = forwardRef((props, ref) => {
  return <LoginButton ref={ref} {...props} />;
});
/*const Controller = ({ control, register, name, rules, render }) => {
  const value = useWatch({ control, name });
  const props = register(name, rules);
  return render({
    onChange: (e) =>
      props.onChange({
        target: {
          name,
          value: e.target.value,
        },
      }),
    onBlur: props.onBlur,
    name: props.name,
  });
};
const Input = (props) => {
  const [value, setValue] = useState(props.value || "");
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <input
      name={props.name}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e.target.value);
      }}
      value={value}
    />
  );
};
*/
//Login Form used by code
const reference = ref(storage, "images/mncdevelopmentlogo.jpg");


export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const handleAction = () => {
    try {
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        if (res) {
          const user = auth.currentUser;
          console.log(JSON.stringify(user));
          sessionStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userToken", JSON.stringify(user));
          navigate("/");
        }
      });
    } catch (error) {}
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {

    }
  , []);
  return (
    <div className="login-form">
      <Box
        component="form"
        autocomplete={true}
        noValidate
      >
        <TextField
         id="email"
         label="Email :"
         variant="outlined"
         onChange={(e) => setEmail(e.target.value)} 
         />
         <TextField
         id="password"
         label="Password :"
         variant="outlined"
         onChange={(e) => setPassword(e.target.value)} 
         />
         <ButtonGroup orientation="horizontal">
        <CustomButton type="submit">Login</CustomButton>
        <Button onClick={handleNavigate}>Register</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

//a different version of the same form, not configured
export const FullPageLogin = () => {
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    console.log(user);
    navigate("/");
  }
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const DownloadURL = async () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    getDownloadURL(reference).then((url) => {
      //      const xhr = new XMLHttpRequest();
      //   xhr.responseType = 'blob';

      //    xhr.open('GET', url);

      const img = document.getElementById("logo");
      img.setAttribute("src", url);
      setImage(url);
    });
  };
  const RenderLogin = () => {
    return (
      <React.Fragment>
        <div className="login-form">
          {<img src={DownloadURL} alt="logo" id="logo" />}
          <LoginForm />
        </div>
      </React.Fragment>
    );
  };
  useEffect(() => {
    DownloadURL();
    if (user) {
      alert("Logged In");
    } else {
      alert("Logged Out");
    }
  }, []);

  return (
    <div className="login-div">
   
        {<ImageBox src={DownloadURL} id="logo" alt="logo" />}
        <img id="logo" alt="logo" src={DownloadURL}></img>
        {RenderLogin}
  
    </div>
  );
};

//model for Form Schema - check rsuite documentation for more info
//const { StringType } = rsuite.Schema.Types;

/*const model = rsuite.Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required."),
}); */

export default LoginForm;
