import { auth, db, storage } from '../../firebase';
import { serverTimestamp, collection,addDoc, onSnapshot } from 'firebase/firestore';
import { Typography,Radio,FormControlLabel,RadioGroup,useRadioGroup,FormControl,FormLabel } from '@mui/material';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';


export const auditLogger = async ({ action = "Added Listing",user }) => {

  try{
    
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = serverTimestamp();
    const collectionRef = collection(db,"auditLogs");
    await addDoc(collectionRef, { action, userName, uid, timestamp }).then((docRef) => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    })}
  catch(err){
    console.log(err);
  }
}
export const HeaderTwo = () => {
  return (
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      Add New Listing
    </Typography>
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

export const MyFormControlLabel = (props) => {
  const radioGroup = useRadioGroup();

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
export default auditLogger;