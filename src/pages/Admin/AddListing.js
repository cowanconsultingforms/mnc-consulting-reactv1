import { getDownloadURL,  ref } from 'firebase/storage';
import React, { useState,useRef,forwardRef,useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db,auth,storage } from "../../firebase";
import { serverTimestamp,addDoc,collection,setDoc} from 'firebase/firestore';
import { Container, FlexboxGrid, Uploader, DOMHelper, Schema, Checkbox, Row,Form,Button,RadioGroup,Radio, Input,Col, Panel} from 'rsuite';
import { StringType } from 'schema-typed';
import {
  StorageError,
  StorageReference,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useMemo } from "react";
import { addAuditLog } from '../../hooks/addAuditLog';
import { Textarea,TextField,RadioPicker } from './AdminPageComponents';
import FileUploader from './FileUploader';

const model = Schema.Model({
  type: StringType().isRequired("This field is required."),
  street: StringType()
    .isRequired("This field is required."),
  city: StringType().isRequired("This field is required."),
  state: StringType()
    .isRequired("This field is required."),
  zip: StringType().isRequired("This field is required."),
  bedrooms: StringType().isRequired("This field is required."),
  bathrooms: StringType().isRequired("This field is required."),
  price: StringType().isRequired("This field is required."),
  description: StringType().isRequired("This field is required."),

});







export const AddListing = () => {
  const { fileList } = useState({});
  const types = [
    { id: 1, type: "Sale", id: 2, type: "Rent", id: 3, type: "Sold" },
  ];
  const formRef = useRef();
  const handleChange = () => {
    setFormValue(formValue.type)
  }
  const [formValue, setFormValue] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    images: [],
    type:""
    
  })
  const [formError, setFormError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = model.validate(formValue);
    if (!isValid) {
      setFormError(errors);
      console.log(JSON.stringify(formError));
    }
    else {
      setFormError({});
      

    
      


        const listing = {
          ...formValue,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser.email,
        };
        await addDoc(db, "listings", listing).then(
          addAuditLog({
            user: auth.currentUser.displayName,
            action: `Added ${formValue.type} listing`,
          })
        );
      
    }
  }
  
      const auditLogger = async ({ action = "Added Listing" }) => {
        const user = auth.currentUser;
        const userName = user.displayName;
        const uid = user.uid;
        const timestamp = serverTimestamp();
        const docRef = collection("auditLogs").doc();
        await setDoc(docRef, { action, userName, uid, timestamp }).then(() => {
          console.log("Audit Log Created");
          console.log(JSON.stringify(docRef));
        });
      };
  useEffect(() => {
    formRef.current = formValue;
  }, [])

  


  
  return (
    <React.Fragment>
      <Panel
        className="listing-flexbox"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "80%",
          height: "100%",
          fontSize: "20px",
          backgroundColor: "gray",
          border: "2px solid black",
          zIndex: "1",
        }}
      >
        <Row>
        <h1 style={{alignItems:'center',justifyContent:'center'}}> Add Listing</h1>
        </Row>
        <Form
          className="listing-form"
          ref={formRef}
          onChange={(formValue) => setFormValue(formValue)}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          onSubmit={handleSubmit}
          style={{
            padding: "10px", margin:'5%' }}
        >
          <Form.Group controlId="type" ref={formRef}>
            <RadioGroup name="type" inline>
              <Radio
                value={formValue.type}
                onChange={() => setFormValue({ type: "forSale" })}
                ref={formRef}
              >
                For Sale
              </Radio>
              <Radio
                value={formValue.type}
                onChange={() => setFormValue({ type: "forRent" })}
                ref={formRef}
              >
                Rental
              </Radio>
              <Radio
                value={formValue.type}
                onChange={(e) => setFormValue({ type: "sold" })}
              >
                Sold Property
              </Radio>
            </RadioGroup>
          </Form.Group>

          <TextField
            name="street"
            label="Street"
            accepter={Input}
            value={formValue.street}
            onChange={(value) => {
              setFormValue({ ...formValue, street: value });
            }}
            style={{
              fontSize: "20px",
              width: "100%",
            }}
          />
          <TextField
            name="city"
            label="City"
            accepter={Input}
            value={formValue.city}
            onChange={(value) => {
              setFormValue({ ...formValue, city: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <TextField
            name="state"
            label="State"
            accepter={Input}
            value={formValue.state}
            onChange={(value) => {
              setFormValue({ ...formValue, state: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <TextField
            name="zip"
            label="Zip"
            accepter={Input}
            value={formValue.zip}
            onChange={(value) => {
              setFormValue({ ...formValue, zip: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <TextField
            name="price"
            label="Price"
            accepter={Input}
            value={formValue.price}
            onChange={(value) => {
              setFormValue({ ...formValue, price: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <TextField
            name="bedrooms"
            label="Bedrooms"
            accepter={Input}
            value={formValue.bedrooms}
            onChange={(value) => {
              setFormValue({ ...formValue, bedrooms: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <TextField
            name="bathrooms"
            label="Bathrooms"
            accepter={Input}
            value={formValue.bathrooms}
            onChange={(value) => {
              setFormValue({ ...formValue, bathrooms: value });
            }}
            style={{ fontSize: "20px", width: "100%" }}
          />
          <Textarea
            name="textarea"
            label="Description"
            value={formValue.description}
            onChange={(value) => {
              setFormValue({ ...formValue, description: value });
            }}
            style={{ fontSize: "20px", width: "100%", height: "200px" }}
          />
          <Button
            appearance="primary"
            style={{
              height: "50px",
              width: "60px",
              color: "white",
              backgroundColor: "black",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Panel>
    </React.Fragment>
  );
}

export const NewListing = () => {
  

  return
  (
    <Container style={{listingStyles}}>
    
    </Container>

  )
}

const listingStyles = [{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  margin: '15%',
  border: '1px solid black',
  borderRadius: '5px',
  

}]
export default AddListing;