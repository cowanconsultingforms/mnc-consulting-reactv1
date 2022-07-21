import React,{forwardRef,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot,collection, DocumentSnapshot ,query,where, serverTimestamp,setDoc} from "firebase/firestore";
import { db ,auth} from "../../firebase";
import {Box,TextField,Button} from "@mui/material";
//code to render search user from the admin page
export const Search = () => {
  const formRef = useRef();
  const [email,setEmail] = useState("");
  

  const HandleSubmit = async () => {
  const q = query(collection(db, "users"), where("email", "===", email));
    try {
      await getDoc(q).then((snap) => {
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
              })}
            </React.Fragment>
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <React.Fragment>
      <h5>Look Up User By Email</h5>

      <Box 
        component="form"
        sx={{display:'flex',justifyContent:'center'}}
      >
      <TextField value={email} label="Email"></TextField>

          <Button
            className="search-button"
            onClick={HandleSubmit}
            type='submit'
          >
            Search
          </Button>
      
      </Box>

    </React.Fragment>
  );
}

export  default Search;