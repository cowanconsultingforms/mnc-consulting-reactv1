import { getDownloadURL,  ref } from 'firebase/storage';
import React, { useState,useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db } from "../../firebase";
import { Timestamp,addDoc} from 'firebase/firestore';
import { Container, FlexboxGrid, Uploader, DOMHelper, Schema, Checkbox, Row,Form,Button,CheckPicker } from 'rsuite';
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
const CheckBox = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
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
              <Checkbox
                name="type"
                label="For Sale"
                accepter={Checkbox}
                value={formValue.type}
                onChange={(value) => {
                  console.log(value);
                  setFormValue({ ...formValue, type: value });
                }}
                style={{ fontSize: "20px" }}
              />
              <Checkbox
                name="type"
                label="Type"
                accepter={Checkbox}
                value={formValue.type}
                onChange={(value) => {
                  console.log(value);
                  setFormValue({ ...formValue, type: value });
                }}
              />
              <Checkbox
                name="type"
                label="Type"
                accepter={Checkbox}
                value={formValue.type}
                onChange={(value) => {
                  console.log(value);
                  setFormValue({ ...formValue, type: value });
                }}
              />
            </Row>
            <TextField
              name="street"
              label="Street"
              accepter={model.street}
              value={formValue.street}
              onChange={(value) => {
                setFormValue({ ...formValue, street: value });
              }}
            />
            <TextField
              name="city"
              label="City"
              accepter={model.city}
              value={formValue.city}
              onChange={(value) => {
                setFormValue({ ...formValue, city: value });
              }}
            />
            <TextField
              name="state"
              label="State"
              accepter={model.state}
              value={formValue.state}
              onChange={(value) => {
                setFormValue({ ...formValue, state: value });
              }}
            />
            <TextField
              name="zip"
              label="Zip"
              accepter={model.zip}
              value={formValue.zip}
              onChange={(value) => {
                setFormValue({ ...formValue, zip: value });
              }}
            />
            <TextField
              name="price"
              label="Price"
              accepter={model.price}
              value={formValue.price}
              onChange={(value) => {
                setFormValue({ ...formValue, price: value });
              }}
            />
            <TextField
              name="bedrooms"
              label="Bedrooms"
              accepter={model.bedrooms}
              value={formValue.bedrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bedrooms: value });
              }}
            />
            <TextField
              name="bathrooms"
              label="Bathrooms"
              accepter={model.bathrooms}
              value={formValue.bathrooms}
              onChange={(value) => {
                setFormValue({ ...formValue, bathrooms: value });
              }}
            />
            <TextArea
              name="description"
              label="Description"
              accepter={model.description}
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