import { collection, getDoc, query, where } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Button, Form, Loader, Schema } from 'rsuite';
import styled from 'styled-components';
import { auth, db } from '../../firebase';


const SearchUserBox = styled.div`
  position: relative;
  text-align: center;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 80%;
  border: 1px solid rgb(197, 197, 197);
`;
const SearchHeader = styled.h4`
  text-decoration: bold;`

function asyncCheckUsername(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (name === "abc") {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 500);
  });
}

const { StringType } = Schema.Types;
const model = Schema.Model({
    email: StringType().isRequired("This field is required.")

  });

export const SearchUser = () => {
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
      name: "",
    });
  const SearchButton = Button.useRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
      <Form.Group controlId={`${name}`} ref={ref}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </Form.Group>
    );
  });

  const SearchBox = SearchUserBox.useRef((props, ref) => {
    const { name, message, label, accepter, error, ...rest } = props;
    return (
      <Form.Group
        controlId={`${name}-search-field`}
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
  return (
      <SearchBox>
        <SearchHeader>Search User</SearchHeader>
      <SearchButton></SearchButton>
      
      </SearchBox>
  
  );
}





export default SearchUser;