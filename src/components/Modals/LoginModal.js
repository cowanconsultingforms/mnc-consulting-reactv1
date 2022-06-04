import { getStorage, ref } from 'firebase/storage';
import React,{ useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'rsuite';
import Modal from "rsuite/Modal";
import { app, auth, db ,storage} from '../../firebase';
import { GetImage } from './LoginForm';
import { ImageBox } from '../Custom/Containers';
import { DownloadURL } from '../Storage/Storage';
import { Schema } from 'rsuite';
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
const TextFieldLogin = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
export const LoginModal = () => {
    
    return (
      <Modal.Body>
        {<ImageBox src={DownloadURL()} alt="logo" />}
        <div className="LoginForm">
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <TextFieldLogin
              name="email"
              label="Email"
              ref={formRef}
              style={{
                padding: "12px 20px",
                margin: "8px 0",
                fontSize: "16px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                outline: "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            />

            <TextFieldLogin
              name="password"
              label="Password"
              type="password"
              ref={formRef}
              value={formValue}
              style={{
                padding: "12px 20px",
                margin: "8px 0",
                fontSize: "16px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                outline: "none",
                textDecoration: "bold",
              }}
            />
            <ButtonToolbar alignItems="center" justifyContent="center">
              <LoginButtonRef
                onClick={HandleSubmit}
                style={{
                  color: "white",
                  padding: "14px 20px",

                  margin: "8px 0",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#686868",
                }}
              >
                Sign in
              </LoginButtonRef>
              <Divider />
              <LoginButtonRef onClick={handleNavigate} ref={formRef}>
                Register Here
              </LoginButtonRef>
            </ButtonToolbar>
          </Form>
        </div>
    
      </Modal.Body>
    );
}

export default LoginModal;




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

  
  return (
    <Container>
      <Modal open={open} onClose={handleClose} size="xs" className="login-modal">
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
          <ButtonToolbar alignItems="center" justifyContent="center">
            <LoginButtonRef
              onClick={HandleSubmit}
              style={{
                color: "white",
                padding: "14px 20px",

                margin: "8px 0",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#686868",
              }}
            >
              Sign in
            </LoginButtonRef>
            <Divider />
            <LoginButtonRef
              onClick={handleNavigate}
              ref={formRef}
              style={{
                color: "white",
                padding: "14px 20px",

                margin: "8px 0",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#686868",
              }}
            >
              Register Here
            </LoginButtonRef>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  

}

