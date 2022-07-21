import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, useRef, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { auditLogger } from "./AdminPageComponents";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, TextField, Button, Typography,Paper } from "@mui/material";
import {InputUnstyled} from '@mui/base';
import { useRadioGroup } from "@mui/material/RadioGroup";
import { uploadBytesResumable } from "firebase/storage";
import {UseRadioGroup } from "./AdminPageComponents";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import IconButton from "@mui/material/IconButton";
import './styles.css';


export const AddListingForm = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState("")
  const formRef = useRef();
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      let listed_by = user.displayName;
    }
    //const [ imageURL, setImageUrl ] = useState([]);
   // const [ progress, setProgress ] = useState(0);
    //const uploadHandler = (e) => {
      e.preventDefault();
      const file = e.target[ 0 ].files[ 0 ];
      //uploadFiles(file);
   // };
  /*  const uploadFiles = (file) => {
      //
      if (!file) return;
      const storageRef = ref(storage, `pictures/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(...imageURL, downloadURL);
          });
        }
      );
    }; */
    const handleSubmit = async (e) => {
      e.preventDefault();
      const listed_at = serverTimestamp();
      const listed_by = user.displayName;
      const docData = {
        street,
        city,
        state,
        zip,
        bedrooms,
        bathrooms,
        price,
        description,
        listed_by: user.displayName,
        listed_at: serverTimestamp(),
      };
      const collRef = collection(db, `listings/${type}/properties`);
      try {
        await addDoc(collRef, { ...docData }).then((res) => {
          if (res !== null) {
            auditLogger("Added Listing", res.id, auth.currentUser.uid);
            <Alert severity="success">Listing Added</Alert>;
            setTimeout(() => { }, 1000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  return (
    <React.Fragment>

      <Box
        className="add-listing-form"
        component="form"
        ref={formRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "left",
          padding: "10px",
          margin: "15%",
          border: "2px solid black",
          borderRadius: "5px",
          width: "75%",
          fontFamily: "Garamond",
        }}
        onSubmit={handleSubmit}
      >
       <UseRadioGroup
          aria-label="listing-type"
          onChange={(e) => setType(e.target.value)}
          name="type"
          sx={{
            justifyContent: "center",
            fontFamily: "Garamond",
            alignItems: "center",
            fontSize: "20px",
            
          }}
        />
          
        <TextField
          aria-label="street"
          name="street"
          label="Street Address"
          onChange={(e) => setStreet(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%",backgroundColor: "white" }}
        />
        <TextField
          name="city"
          label="City"
          onChange={(e) => setCity(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%" }}
        />
        <TextField
          name="state"
          label="State"
          onChange={(e) => setState(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%" }}
        />
        <TextField
          name="zip"
          label="Zip Code"
          onChange={(e) => setZip(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%" }}
        />
        <TextField
          name="bedrooms"
          label="# of Bedrooms"
          onChange={(e) => setBedrooms(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%" }}
        />
        <TextField
          name="bathrooms"
          label="# of Bathrooms"
          onChange={(e) => setBathrooms(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%" }}
        />
        <TextField
          name="price"
          label="Listing Price"
          onChange={(e) => setPrice(e.target.value)}
          sx={{ fontFamily: "Garamond", width: "80%", fontSize: "18px" }}
        />
        <InputUnstyled 
          component="textarea"
          placeholder="Property Details"
          minRows={8}
          maxRows={12}
          name="description"
          label="Property Description"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            fontFamily: "Garamond",
            width: "80%",
            justifyContent: "left",
            fontSize: "18px",
          }}
        />
        <InputUnstyled id="contained-button-file" multiple type="file" accept="/image/*"></InputUnstyled>
        <Button variant="contained"  sx={{padding:'10px'}}>Upload</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Add Property
        </Button>
      </Box>
    </React.Fragment>
)  
};

export default AddListingForm;
