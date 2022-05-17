import styled from 'styled-components';
import Modal from "rsuite/Modal";
import { Button,RadioGroup,ButtonToolbar,Form} from 'rsuite';
import React,{useState} from 'react';
import TextField from '../components/TextField';
import ModalContainer from '../components/Modals';
import { db, auth } from '../firebase';
import { useForm } from 'react-hook-form';
import { LoginButton } from './FullPageLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const storage = getStorage();
  const pathRef = ref(storage, "images/mncdevelopmentlogo.jpg");
  const [logo, setLogo] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  const getImage = () => {
    getDownloadURL(pathRef)
      .then((url) => {
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
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {getImage()}
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
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Login;