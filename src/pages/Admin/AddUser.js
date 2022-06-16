import React,{useState,useRef,useEffect,forwardRef} from "react";
import TextField  from "./AdminPageComponents";
import { Input, Form } from "rsuite";
import { collection, addDoc, setDoc } from 'firebase/firestore';

export const AddUser = () => {
  const formRef = useRef();
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    uid: "",
    email: "",
    userName: "",
    role: "Regular",
    portfolio: [{ min: "", max: "" }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'users');
  };
  return (
    <React.Fragment>
      <Container className="add-user-container">
        <h1>Add New User</h1>
        <Form
          className="add-user-form"
          ref={formRef}
          value={formData}
          onClick={handleSubmit}
          onChange={setFormData}
          onCheck={setFormError}
        >
          <TextField accepter={Input} label="uuid" name="uid" />
          <TextField accepter={Input} label="email" name="email" />
          <TextField accepter={Input} label="userName" name="userName" />
          <TextField accepter={Input} label="role" name="role" />
          <TextField accepter={Input} label="portfolio" name="min" />
          <TextField accepted={Input} label="max" name="max" />
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </Container>
    </React.Fragment>
  );
};
