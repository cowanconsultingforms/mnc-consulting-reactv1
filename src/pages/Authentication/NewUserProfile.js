import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
} from "firebase/firestore";
import { LandingFooter } from "../Home/Footer";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { db, auth } from "../../firebase";
import "./styles.css";
import { Form, Schema } from "rsuite";

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={`${name}`}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  age: NumberType("Please enter a valid number.").range(
    18,
    30,
    "Please enter a number from 18 to 30"
  ),
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

export const NewUserSignUp = ({ title }) => {
  const uid = auth.currentUser.uid;
  const role = "User";
  const createdAt = Date.now();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = useState({
    email: "",
    userName: "",
    portfolioMin: "",
    portfolioMax: "",
  });
  const userRef = doc(collection(db, "users"));
  const formRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, userName, portfolioMin, portfolioMax, role } =
      formRef.current.elements;
    const newUser = {
      email,
      userName,
      portfolioMin,
      portfolioMax,
      role: "User",
      created_at: Date.now(),
    };
    const docRef = doc(userRef, { ...newUser });
    try {
      await setDoc(docRef).then((doc) => {
        console.log(doc);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {});
  return (
    <React.Fragment>
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        formValue={formValue}
        onChange={setFormValue}
      >
      <Field name="email" label="Email" />
      <Field name="userName" label="User Name" />
      <Field name="portfolioMin" label="Portfolio Min" />
      <Field name="portfolioMax" label="Portfolio Max" />
      <Button appearance="primary" type="submit">Submit</Button>
      </Form>
    </React.Fragment>
  );
};
export const NewUserPage = ({ title }) => {
  const [email, setEmail] = useState("");
  const uid = auth.currentUser.uid;
  const role = "User";
  const createdAt = Date.now();
  const [userName, setUserName] = useState("");
  const [portfolioMin, setPortfolioMin] = useState("");
  const [portfolioMax, setPortfolioMax] = useState("");
  const userRef = doc(db, "users");
  const formRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, userName, portfolioMin, portfolioMax, role } =
      formRef.current.elements;
    const newUser = {
      email,
      userName,
      portfolioMin,
      portfolioMax,
      role: "User",
      created_at: Date.now(),
    };
    const docRef = doc(userRef, { ...newUser });
    try {
      await addDoc(docRef).then((doc) => {
        console.log(doc);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {});
  return (
    <React.Fragment>
      <Box
        className="new-user-form"
        component="form"
        onSubmit={onSubmit}
        ref={formRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "Garamond",
          backgroundColor: "grey",
        }}
      >
        <h1>{title} Form</h1>
        <TextField
          name="userName"
          label="User Name"
          sx={{ m: 2, fontFamily: "Garamond", backgroundColor: "whitesmoke" }}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          sx={{ m: 2, fontFamily: "Garamond", backgroundColor: "whitesmoke" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="portfolioMin"
          label="Portfolio Minimum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e) => setPortfolioMin(e.target.value)}
        />
        <TextField
          name="portfolioMax"
          label="Portfolio Maximum"
          sx={{ m: 2, backgroundColor: "whitesmoke" }}
          onChange={(e) => setPortfolioMax(e.target.value)}
        />
        <Button variant="contained" className="add-user-button" type="submit">
          Complete Registration
        </Button>
      </Box>
      <LandingFooter />
    </React.Fragment>
  );
};

export default NewUserPage;
