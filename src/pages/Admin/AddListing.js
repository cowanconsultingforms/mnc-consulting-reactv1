import { getDownloadURL,  ref } from 'firebase/storage';
import React, { useState,useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db,auth } from "../../firebase";
import { Timestamp,addDoc} from 'firebase/firestore';
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
const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const TextArea = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
const RadioPicker = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
  
      <RadioGroup name={name} inline appearance="picker" defaultValue={'forSale'} ref={ref}>
        <Radio value={this.state.type}>For Sale</Radio>
        <Radio value={this.state.type}>Rental</Radio>
        <Radio value={this.state.type}>Sold</Radio>
      </RadioGroup>

  );
});
export const AddListing = () => {
const types = [
  { id: 1, type: "Sale", id: 2, type: "Rent", id: 3, type: "Sold" },
];
  const [type,setType] = useState("");
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { isValid, errors } = model.validate(formValue);
    if (!isValid) {
      setFormError(errors);
      console.log(JSON.stringify(formError));
    }
    else {
      setFormError({});
      addDoc(db, "listings", formValue)
        .then(
          addAuditLog({
            user: auth.currentUser, action: `Added ${formValue.type} listing`
          }));
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
        margin: "15%",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <FlexboxGrid
        className="listing-flexbox"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "gray",
          width: "100%",
          height: "100%",
          float: "left",
          fontSize: "20px",
        }}
      >
        <FlexboxGrid.Item
          colspan={12}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "gray",
            width: "100%",
            height: "100%",
            float: "left",
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
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "gray",
                width: "100%",
                height: "100%",
                float: "left",
                justifyContent: "center",
              }}
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
            </Row>
            <TextField
              name="street"
              label="Street"
              accepter={Input}
              value={formValue.street}
              onChange={(value) => {
                setFormValue({ ...formValue, street: value });
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
            />
            <TextField
              name="state"
              label="State"
              accepter={Input}
              value={formValue.state}
              onChange={(value) => {
                setFormValue({ ...formValue, state: value });
              }}
            />
            <TextField
              name="zip"
              label="Zip"
              accepter={Input}
              value={formValue.zip}
              onChange={(value) => {
                setFormValue({ ...formValue, zip: value });
              }}
            />
            <TextField
              name="price"
              label="Price"
              accepter={Input}
              value={formValue.price}
              onChange={(value) => {
                setFormValue({ ...formValue, price: value });
              }}
            />
            <TextField
              name="bedrooms"
              label="Bedrooms"
              accepter={Input}
              value={formValue.bedrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bedrooms: value });
              }}
            />
            <TextField
              name="bathrooms"
              label="Bathrooms"
              accepter={Input}
              value={formValue.bathrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bathrooms: value });
              }}
            />
            <Uploader>
            
            </Uploader>
            <TextArea
              name="description"
              label="Description"
              accepter={Input}
              value={formValue.description}
              width="100%"
              onChange={(value) => {
                setFormValue({ ...formValue, description: value });
              }}
            />
            <Button
              onClick={() => {
                const errors = model.validate(formValue);
                setFormError(errors);
                if (Object.keys(errors).length === 0) {
                  const listing = {
                    ...formValue,
                    createdAt: new Date(),
                    createdBy: auth.credential,
                  };
                  addDoc(db.collection("listings"), listing);
                }
              }}
            >
              Submit
            </Button>
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