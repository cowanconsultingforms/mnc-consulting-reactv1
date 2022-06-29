import { collection, getDoc, query, where, querySnapshot, doc,onSnapshot } from 'firebase/firestore';
import React,{forwardRef,useRef,useEffect,useState} from 'react';
import { Box,TextField } from '@mui/material';
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
export const SearchUser = (props) => {
  
  const initialValues = {uid:"",email:"",userName:"",role:"",phoneNumber:"",}
  const formRef = React.useRef(initialValues);
  const [formError, setFormError] = React.useState({});
  const [user, setUser] = useState({});
  const [formValue,setFormValue] = useState({})
  const isMounted = useRef();
  const [docsData, setDocsData] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async(id) => {
    const data = await UserDataService.getUser(id);
    console.log(data);
    setUser(data)
  }
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
        setDocsData(data.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        }))
    })
}

  const handleSubmit = async() => {
    formRef.current.checkAsync().then((result) => {
      console.log(result);
    });
    const q = query(collectionRef, where("email", "==", formValue.email));
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
    if(isMounted.current){
        return 
    }

    isMounted.current = true;
    getData()
}, [])
  


    
  return (
    <Box className="search-user-container">
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
    </Box>
  );
  }

export const AddUser = ({userName,role,uuid,email,portfolio}) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ uid: "", email: "", userName: "", role: "Regular" });
  const handleSubmit = async(e) => { 
    e.preventDefault();
  }
  useEffect(() => {
    return () => {
      
    };
  }, []);
  return (
    <React.Fragment>
      <h1>Search Users</h1>
      <Box className="add-user-form"
        ref={formRef}
        value={formData}
        onClick={handleSubmit}
        onChange={setFormData}
      onCheck={setFormError}>
        <TextField
          
          label="uuid"
          name="uid" />
        <TextField
       
          label="email"
          name="email" />
        <TextField
      
          label="userName"
          name="userName" />
        <TextField
          
          label="role"
          name="role" />
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonToolbar>
      </Box>
    </React.Fragment>
      
    )
}





export default SearchUser;