import React,{useState,useEffect} from 'react'
import { db, auth, userSignOut, signIn, signUp } from '../firebase'
import { useForm } from 'react-hook-form';
import useQueryString from '../hooks/useQueryString';
import TextField from '../components/TextField';
import styled from 'styled-components';
import { whereEqualTo ,query} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useAuthState } from "react-firebase-hooks/auth";
import { Form } from 'rsuite';
export const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 75%;
    padding-top:25%;
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

export const FullPageLogin = () => {
  const storage = getStorage();
  const pathRef = ref(storage, "images/mncdevelopmentlogo.jpg");
  const [logo, setLogo] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleOnChange = (e)=>e.target.value;
  const handleOnSubmit = async () => {
        if (password === password2) {
            await signIn(email, password).then((user) => {
                db.collection('users').whereEqualTo("email", user.email).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data())
                        sessionStorage.setItem("user", JSON.stringify(doc));
                        navigate('/');
                    })
                });
        
            });
        }
    }
    const getImage = () => {
      getDownloadURL(pathRef).then((url) => {
        setLogo(url);
        const img = document.getElementById('logo');
        img.setAttribute('src', url);
      }).catch((error) => {
        console.log(error)
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    }
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

    return (
      <LoginDiv>
        {getImage()}
        <img id="logo"></img>
        <Form>
          <Form.Group controlId="email">
            <Form.ControlLabel>
            Email :
            </Form.ControlLabel>
            <TextField
              canEdit
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
            ></TextField>
          </Form.Group>
          <TextField
            canEdit={true}
            type="password"
            label="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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

          <TextField
            canEdit={true}
            type="password"
            label="password2"
            placeholder="Re Enter Password"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
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
          <LoginButton type="submit" onClick={handleOnSubmit()}>Login</LoginButton>
        </Form>
        <LoginButton type="submit" onClick={navigate("/register")}>
          No Account? Register
        </LoginButton>
      </LoginDiv>
    );
    
}

export default FullPageLogin;