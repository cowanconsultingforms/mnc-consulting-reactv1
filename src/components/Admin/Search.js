import React,{forwardRef,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot,collection, DocumentSnapshot ,query,where, serverTimestamp,setDoc} from "firebase/firestore";
import { db ,auth} from "../../firebase";
import './styles.css';
import { useAuthState } from "react-firebase-hooks/auth";
import {Box,TextField,Button} from "@mui/material";
//code to render search user from the admin page
export const Search = () => {
  const collectionRef = collection(db, "users");
  
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    email: "",
  });
  const auditLogger = async ({ action = "Modified User Account" }) => {
    const user = auth.currentUser;
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = serverTimestamp();
    const docRef = collection("auditLogs")
    await setDoc(docRef, { action, userName, uid, timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
  };
  const HandleSubmit = async() => {
    if (!formRef.current.check()) {
      return;
    }
    
    const q = query(collection(db, "users"), where("email", "===", formValue.email));
    getDoc(q).then((snap) => {
      if (snap.exists) {
        console.log(snap.data());
        return (
          <React.Fragment>
            {snap.data().map((id, value) => {
              return (
                <React.Fragment>
                  <Box className="search-result">
                    <input value={value} key={id} type="text"></input>
                  </Box>
                </React.Fragment>
              );
            })
            }
          </React.Fragment>
        )
      }
    });
    }


  return (
    <React.Fragment>
      <h4>Look Up User</h4>

      <Box 
        component="form"
      >
      <TextField></TextField>

          <Button
            className="search-button"
            value="Search"
            type='submit'
          >
            Search
          </Button>
      
      </Box>
      {formValue}
    </React.Fragment>
  );
}

export  default Search;