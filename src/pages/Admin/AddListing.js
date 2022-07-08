import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, useRef, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { db, auth, storage} from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { auditLogger } from "./AdminPageComponents";
import FileUploader from "./FileUploader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRadioGroup } from "@mui/material/RadioGroup";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const MyFormControlLabel = (props) => {
  const radioGroup = useRadioGroup()

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <FormControlLabel checked={checked} {...props} />;
};

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export const UseRadioGroup = ({ onChange }) => {
  return (
    <RadioGroup
      name="listing-type-group"
      defaultValue="null"
      onChange={onChange}
      sx={{ fontFamily: "Garamond" }}
    >
      <MyFormControlLabel
        value="forSale"
        control={<Radio />}
        label="List For Sale"
        sx={{ fontFamily: "Garamond" }}
      />
      <MyFormControlLabel
        value="forRent"
        control={<Radio />}
        label="List For Rent"
        sx={{ fontFamily: "Garamond" }}
      />
      <MyFormControlLabel
        value="sold"
        control={<Radio />}
        label="Sold"
        sx={{ fontFamily: "Garamond" }}
      />
    </RadioGroup>
  );
};
export const RadioButtonsGroup = ({ onChange }) => {
  return (
    <FormControl>
      <FormLabel id="listing-type">Select Listing Type</FormLabel>
      <RadioGroup
        aria-labelledby="listing-type"
        defaultValue="forSale"
        name="listing-group"
        onChange={onChange}
        sx={{ fontFamily: "Garamond" }}
      >
        <FormControlLabel
          value="forSale"
          control={<Radio />}
          label="List For Sale"
          sx={{ fontFamily: "Garamond" }}
        />
        <FormControlLabel
          value="forRent"
          control={<Radio />}
          label="List For Rent"
          sx={{ fontFamily: "Garamond" }}
        />
        <FormControlLabel
          value="sold"
          control={<Radio />}
          label="Sold Listings"
          sx={{ fontFamily: "Garamond" }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export const AddListingForm = () => {
  const [user, loading, error] = useAuthState(auth);
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
  const [files,setFiles] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docData = {
      street,
      city,
      state,
      zip,
      bedrooms,
      bathrooms,
      price,
      description,
    };
    const collRef = collection(db, `listings/${type}/properties`);
    console.log(docData);
    try {
      await addDoc(collRef, { ...docData }).then((res) => {
        if (res !== null) {
          auditLogger('Added Listing', res.id, user.uid)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

  }, []);

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
          sx={{ fontFamily: "Garamond", width: "80%" }}
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
        <TextareaAutosize
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
       
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Add Property
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default AddListingForm;
