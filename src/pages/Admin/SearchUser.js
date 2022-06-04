import { collection, getDoc, query, where, querySnapshot, doc,onSnapshot } from 'firebase/firestore';
import React,{forwardRef,useRef,useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Button, Form, Loader, Schema, Container, Input, FlexboxGrid,ButtonToolbar} from 'rsuite';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import { AccountInput } from '../../components/Custom/AccountStyles';
import { useIsMounted } from 'rsuite/esm/utils';

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

export const AccountPageContainer = styled.div`
  margin: auto;
  padding-top: 100px;
  display: flex;
  width: 75%;
  height: 100%;

`;
const { StringType, NumberType } = Schema.Types;

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
const model = Schema.Model({
  name:StringType().isRequired(),
})
const TextFieldLogin = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
export const SearchUser = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: "",
  });
  const isMounted = useRef();

  const handleSubmit = () => {
    formRef.current.checkAsync().then((result) => {
      console.log(result);
    });
    getDoc(db, "users", "email", formValue.name).then(onSnapshot(db, "users"), data => {
      data.map(doc => {
        return (
          <React.Fragment>
            <Container>
              <Input value={doc.uid} type="text"></Input>
            </Container>
          </React.Fragment>
        );
      })
    });
  }
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    
  })
  


    
  return (
    <AccountPageContainer>
      <SearchHeader>Search User</SearchHeader>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={18} style={{}}>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
          >
            <Form.Group controlId="name-2">
              <Form.ControlLabel>Username </Form.ControlLabel>
              <Form.Control
                checkAsync
                name="name"
                placeholder="Please enter abc"
              />
            </Form.Group>

            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </AccountPageContainer>
  );
  }






export default SearchUser;