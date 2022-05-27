import styled from 'styled-components';
import Modal from "rsuite/Modal";
import { Button,RadioGroup,ButtonToolbar,Form} from 'rsuite';
import React,{useState} from 'react';
import { db, auth ,app} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { GetImage } from './LoginForm';
import { useDownloadURL } from 'react-firebase-hooks/storage';


const storage = getStorage(app);
export const Login = () => {
  
  const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);

  const handleSignIn = async (formValue) => {
    const { email, password } = formValue;
    try {
      await auth.signInWithEmailAndPassword(email, password).then((user) => {
        db.collection('users').whereEqualTo("email", user.email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            sessionStorage.setItem("user", JSON.stringify(doc));
            console.log(sessionStorage.getItem("user"));
            navigate('/');
          })
        });
      });
      
    } catch (error) {
      console.log(error);
    }
  }
    const GetImage = async () => {
      const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
      const [downloadUrl, loading, error] = useDownloadURL(reference);
      await downloadUrl(reference).then(() => {
        return (
          <React.Fragment>
            <img src={downloadUrl} alt="logo" />
          </React.Fragment>
        );
      });
    };
  const handleNavigate = () => { 
    navigate('/register');
  }

 /*   
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {GetImage()}
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSignIn} appearance="primary">
            Login
          </Button>
          <Button
            onClick={HandleNavigate()}
            appearance="subtle"
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
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
  */
  return (
    <React.Fragment>
      </React.Fragment>
  )
}

export default Login;