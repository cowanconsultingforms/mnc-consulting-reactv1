import React, { useState } from 'react'
import { db, auth, userSignOut, signIn, signUp } from '../firebase'
import TextField from '../components/TextField'
import { LoginDiv, LoginButton } from './FullPageLogin'
import { getDownloadURL, getStorage,ref } from 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Form } from 'rsuite'

export const FullPageRegister = () => {


  const storage = getStorage();
  const pathRef = ref(storage, "images/mncdevelopmentlogo.jpg");
  const [logo, setLogo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleOnChange = (e) => e.target.value;
  const handleOnSubmit = async () => {
    if (password === password2) {
      await signIn(email, password).then((user) => {
        db.collection("users")
          .whereEqualTo("email", user.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              sessionStorage.setItem("user", JSON.stringify(doc));
              navigate("/account");
            });
          });
      });
    }
  };
  const getImage = () => {
    getDownloadURL(pathRef)
        .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open("GET", url);
              xhr.send();
        setLogo(url);
        const img = document.getElementById("logo");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };

    return (
      <React.Fragment>
        <LoginDiv>
          {getImage()}
          <img id="logo"></img>
          <Form>
            <TextField
              canEdit
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{
                width: "100%",
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
            <LoginButton type="submit" onClick={handleOnSubmit()}>
              Login
            </LoginButton>
          </Form>
        </LoginDiv>
      </React.Fragment>
    );
}

export default FullPageRegister;