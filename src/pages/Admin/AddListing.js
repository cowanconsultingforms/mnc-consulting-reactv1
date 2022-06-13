import { getDownloadURL,  ref } from 'firebase/storage';
import React, { useState,useRef,forwardRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db,auth,storage } from "../../firebase";
import { serverTimestamp,addDoc,collection,setDoc} from 'firebase/firestore';
import { Container, FlexboxGrid, Uploader, DOMHelper, Schema, Checkbox, Row,Form,Button,RadioGroup,Radio, Input} from 'rsuite';
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
import {addAuditLog} from '../../hooks/addAuditLog';

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
const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const TextAreaRef = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
const RadioPicker = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
  
      <RadioGroup name={name} inline appearance="picker" defaultValue={'forSale'} ref={ref}>
      <Radio value={'forSale'}>For Sale</Radio>
        <Radio value={'forRent'}>Rental</Radio>
        <Radio value={'sold'}>Sold</Radio>
      </RadioGroup>

  );
});


export const AddListing = () => {
  const { fileList } = useState([]);
  const types = [
    { id: 1, type: "Sale", id: 2, type: "Rent", id: 3, type: "Sold" },
  ];
  const [type, setType] = useState("");
  const formRef = React.useRef();
  const [formValue, setFormValue] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    
  })
  const [formError, setFormError] = useState({});
  const RenderFileInfo = (file, fileElement) => {
fileList = [{fileElement:fileElement,file:file}];
    return (
        <div>
          <span>File Name: {file.name}</span>
          <p>File URL: {file.url}</p>
        </div>
      );
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = model.validate(formValue);
    if (!isValid) {
      setFormError(errors);
      console.log(JSON.stringify(formError));
    }
    else {
      setFormError({});
      

    
      
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
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

        const listing = {
          ...formValue,
          createdAt: new Date(),
          createdBy: auth.currentUser.email,
        };
        await addDoc(db, "listings", listing).then(
          await addAuditLog({
            user: auth.currentUser,
            action: `Added ${formValue.type} listing`,
          })
        );
      
    }
  }

  


  
  return (
    <Container
      className="add-listing"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        margin:'20%',
        border: "1px solid black",
        borderRadius: "5px",
        width: "80%",
      }}
    >
     
      <FlexboxGrid
        className="listing-flexbox"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent:'center',
          width: "100%",
          height: "100%",
          float: "center",
          fontSize: "20px",
          alignItems: "center",
        }}
      >
        <FlexboxGrid.Item
          colspan={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            width: "100%",
            height: "100%",
            float: "left",
            fontSize: "20px",
            margin:"100px"
          }}
        >
          <Form
            className="listing-form"
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            onSubmit={handleSubmit}
          >
            <RadioPicker
              name="type"
              label="For Sale"
              accepter={RadioGroup}
              value={type}
              onChange={() => {
                setType("forSale");
                setFormValue({ ...formValue, type: type });
              }}
              style={{
                fontSize: "20px",
                padding: "8px 2px 8px 10px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />

            <TextField
              name="street"
              label="Street"
              accepter={Input}
              value={formValue.street}
              onChange={(value) => {
                setFormValue({ ...formValue, street: value });
              }}
              style={{ fontSize: "20px", width: "100%" }}
            />
            <TextField
              name="city"
              label="City"
              accepter={Input}
              value={formValue.city}
              onChange={(value) => {
                setFormValue({ ...formValue, city: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
            <TextField
              name="state"
              label="State"
              accepter={Input}
              value={formValue.state}
              onChange={(value) => {
                setFormValue({ ...formValue, state: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
            <TextField
              name="zip"
              label="Zip"
              accepter={Input}
              value={formValue.zip}
              onChange={(value) => {
                setFormValue({ ...formValue, zip: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
            <TextField
              name="price"
              label="Price"
              accepter={Input}
              value={formValue.price}
              onChange={(value) => {
                setFormValue({ ...formValue, price: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
            <TextField
              name="bedrooms"
              label="Bedrooms"
              accepter={Input}
              value={formValue.bedrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bedrooms: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
            <TextField
              name="bathrooms"
              label="Bathrooms"
              accepter={Input}
              value={formValue.bathrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bathrooms: value });
              }}
              style={{ fontSize: "20px", width: "80%" }}
            />
   
            <Textarea
              name="description"
              label="Description"
              accepter={Input}
              value={formValue.description}
              width="100%"
              onChange={(value) => {
                setFormValue({ ...formValue, description: value });
              }}
              style={{ fontSize: "20px", width: "80%",height:'200px' }}
            />
            <Button style={{height:'20px',width:'100%', color:'white',backgroundColor:"black"}} type="submit">Submit</Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
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