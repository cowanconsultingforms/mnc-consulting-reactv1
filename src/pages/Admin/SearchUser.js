import { collection, getDoc, query, where, querySnapshot, doc,onSnapshot } from 'firebase/firestore';
import React,{forwardRef,useRef,useEffect,useState} from 'react';
import { Box,TextField,Button,ButtonGroup } from '@mui/material';
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

export const AccountPageContainer = styled.div`
  margin: auto;
  padding-top: 100px;
  display: flex;
  width: 75%;
  height: 100%;

`;
export const SearchUser = (props) => {
  const collectionRef = collection(db, 'users');
  const initialValues = {uid:"",email:"",userName:"",role:"",phoneNumber:"",}
  const formRef = React.useRef(initialValues);
  const [formError, setFormError] = React.useState({});
  const [user, setUser] = useState({});
  const [formValue,setFormValue] = useState(initialValues)
  const isMounted = useRef();
  const [docsData, setDocsData] = useState([]);



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
            <Box component="form">
              <TextField value={doc.uid} type="text"></TextField>
            </Box>
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
    <Box className="search-user-container"
    component="form"
    ref={formRef}
    onChange={setFormValue}
    sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <SearchHeader>Search User</SearchHeader>

   
        <TextField name="search" label="Search" fullWidth />

            <ButtonGroup>
              <Button appearance="primary" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </ButtonGroup>
    

    </Box>
  );
  }







export default SearchUser;