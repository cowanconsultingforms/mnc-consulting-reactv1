import React,{ useState ,useEffect,forwardRef} from 'react'
import styled from 'styled-components';
import { db, auth } from "../../firebase";
import { doc, getDoc ,query,collection,where,onSnapshot} from "firebase/firestore";
import { ProfileButton } from "../../components/Custom/Buttons";
import { useAuthState, } from 'react-firebase-hooks/auth';
import { useDocumentDataOnce ,useCollectionData} from 'react-firebase-hooks/firestore';
import {TextField} from '@mui/material'

import { Box,Button } from '@mui/material';




export const LoadProfile = () => {
  
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    email: '',
    role: '',
    uid: '',
    userName: ''
  });

  const [user, loading, error] = useAuthState(auth);
  const handleSubmit = () => {
    
  }
  const getData = () => {
    localStorage.getItem("user");
    
    const q = query(collection("users")).where("uid", "==", user.uid);
    getDoc(q).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setFormValue(...data);
      }
    });
  }
  useEffect(() => {
    if (user) {
      getData({ user });
      
    }
  },[user]);


  

  
  //returns the heading of the profile page box using Rsuite Form Validation to validate the input
  return (
    <div className="account-page-profile">
      <h4>Profile</h4>
      <Box
        component="form"
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
      
      >
        <TextField controlId="profile-lookup"
    
              id="email-field"
              name="email"
              label="User Email :"
              value={formValue}
              canEdit
              onChange={setFormValue((e) => e.target.value)}
              required
            />
 
            <Button onClick={handleSubmit} type="submit">Save</Button>
   
      
      </Box>
    </div>
  );
} 



//  const retrieveUser = () => {
 //   user = localStorage.getItem("user");

  //  if (!error && !loading && user) {
  //    setUserName(user);
  //  }
// };
//const LoadProfile = () => {
  //  const user = sessionStorage.getItem("user");
  //  const [value, snapshot, loading, error] = useDocumentDataOnce(
  //    doc(db, "users", user.email)
 //   );
 /*  if (!user) {
    value = null;
    snapshot = null;
    loading = false;
    error = null;
  } else {
    const ref = doc(db, "users", user.uid).withConverter(userConverter);
    const [data, loading, error] = useCollectionData(ref);
  }
      return (
        <React.Fragment>
          <div>
            <TextFieldProfile
              id="uid-field"
              label="User ID:"
              value={user.uid}
              ref={formRef}
            />

            <TextFieldProfile
              id="role-field"
              label="Role :"
              value={user.role}
            />

            <TextFieldProfile
              id="admin-field"
              label="Admin ? :"
              value={user.email}
            />
          </div>
        </React.Fragment>
      );
    } */
export default LoadProfile;
