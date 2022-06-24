import React, { useState, useRef, useEffect, forwardRef } from "react";
import { TextField } from "@mui/material";
import { Form, Input, Panel, Schema, Button, ButtonToolbar } from "rsuite";
//import { Form } from 'react-bootstrap';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { StringType } from "schema-typed";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles.css";
import { UserDataService } from "../../services/crudoperations";
import { useLayoutEffect } from "react";
const model = Schema.Model({
  uid: StringType().isRequired("This field is required."),
  userName: StringType().isRequired("This field is required."),
  email: StringType().isRequired("This field is required."),
  role: StringType().isRequired("This field is required."),
});
export const AddUser = () => {
  const collectionRef = collection(db, "users");
  const [user, loading, error] = useAuthState(auth);
  const formRef = useRef();
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [formData, setFormData] = useState({
    uuid: "",
    email: "",
    userName: "",
    privilege: "Regular",
    createdon: serverTimestamp(),
  });
  const handleSubmit = async () => {
    const newUser = { ...formData };
    console.log(newUser);
    const doc = (collectionRef, newUser.uuid);

    try {
      addDoc(doc, newUser);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {});
  return (
    <React.Fragment>
      <Panel className="add-user-container">
        <h1>Add New User</h1>
        <Form
          fluid
          className="add-user-form"
          ref={formRef}
          value={formData}
          onSubmit={handleSubmit}
          onChange={setFormData}
          onCheck={setFormError}
        >
          <TextField
            className="search-field"
            label="UUID :"
            name="uuid"
            ref={formRef}
            value={formData.uuid}
          />
          <TextField
            className="search-field"
            label="Email :"
            name="email"
            ref={formRef}
            value={formData.email}
          />
          <TextField
            className="search-field"
            label="Username"
            name="userName"
            ref={formRef}
            value={formData.userName}
          />
          <TextField
            className="search-field"
            label="Privilege Level"
            name="privilege"
            ref={formRef}
            value={formData.privilege}
          />

          <Form.Group>
            <Button appearance="primary" type="submit" ref={formRef}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </React.Fragment>
  );
};
export default AddUser;
