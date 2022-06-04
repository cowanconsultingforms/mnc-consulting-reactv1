import React, { useState } from 'react';
import { Container, Modal } from 'rsuite';
import styled from 'styled-components';
import { app, auth, db, storage } from "../../firebase";
import { ImageBox } from '../Custom/Containers';
import { DownloadURL } from '../Storage/Storage';
import { Schema } from "rsuite";
import { getStorage, ref } from "firebase/storage";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "rsuite";
import './styles.css';


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
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
const style = {
      margin: '5% auto 15% auto',
  border: '1px solid #888',
  width: '20%',
  background: 'rgb(209, 209, 209)',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)', 
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '2',
  position:'fixed',
  left:0,
  top:0,
  overflow:'auto'
}



export const ModalComponent = () => {
    
  const [open, setOpen] = useState(false);
  const [backDrop,setBackdrop] = useState('static');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [modal,setModal] = useState('modal-login');
  const DownloadURL = () => {
        const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
        const [value, loading, error] = useDownloadURL(reference);
        
        return (
          (
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
          ),
          [value, loading, error]
        );
      }; 

    return (
      <Container style={style}>
        <Modal
          backDrop={backDrop}
          keyboard={false}
          open={open}
          onClose={handleClose}
          aria-labeledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Modal.Header>
            <Modal.Title>
              <span
                onClick={() => setOpen(false)}
                style={{
                  position: "relative",
                  left: "90%",
                  color: "#000",
                  fontSize: "35px",
                  fontWeight: "bold",
                }}
              ></span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {<ImageBox src={DownloadURL()} alt="logo" />}
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Login</h3>} bordered>
                  <Form fluid>
                    <TextFieldLogin
                      name="email"
                      label="Email:"
                      accepter="ModalComponent"
                    ></TextFieldLogin>
                    <TextFieldLogin
                      name="password"
                      type="password"
                      autoComplete="off"
                      label="Password:"
                    >
         
                    </TextFieldLogin>
                    <Form.Group>
                      <ButtonToolbar>
                        <Button appearance="primary" type="submit">Sign in</Button>
                        <Button appearance="link">Forgot password?</Button>
                      </ButtonToolbar>
                    </Form.Group>
                  </Form>
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary" type="submit">
              Save
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
}

export default ModalComponent;