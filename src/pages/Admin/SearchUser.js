import { collection, getDoc, query, where, querySnapshot, doc,onSnapshot } from 'firebase/firestore';
import React,{forwardRef,useRef,useEffect,useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Button, Form, Loader, Schema, Container, Input, FlexboxGrid,ButtonToolbar} from 'rsuite';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import UserDataService from '../../services/crudoperations';
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
const TextField = forwardRef((props, ref) => {
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
  const [user, setUser] = useState({});
  const [formValue,setFormValue] = useState({})
  const isMounted = useRef();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async(id) => {
    const data = await UserDataService.getUser(id);
    console.log(data);
    setUser(data)
  }
  

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
    <Container className="search-user-container">
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
    </Container>
  );
  }

export const AddUser = ({userName,role,uuid,email,portfolio}) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [user, setUser] = useState({});
  const [formData,setFormData] = useState({uid:"",email:"",userName:"",role:"Regular",portfolio:[{min:"",max:""}]})
  const handleSubmit = async(e) => { 
    e.preventDefault();
  }
  return (
    <React.Fragment>
      <h1>Add New User</h1>
      <Form className="add-user-form"
        ref={formRef}
        value={formData}
        onClick={handleSubmit}
        onChange={setFormData}
      onCheck={setFormError}>
        <TextField
          accepter={Input}
          label="uuid"
          name="uid" />
        <TextField
          accepter={Input}
          label="email"
          name="email" />
        <TextField
          accepter={Input}
          label="userName"
          name="userName" />
        <TextField
          accepter={Input}
          label="role"
          name="role" />
        <TextField
          accepter={Input}
          label="portfolio"
          name="portfolio" />
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    </React.Fragment>
      
    )
}





export default SearchUser;