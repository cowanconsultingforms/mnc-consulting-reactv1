import React, { forwardRef,useRef ,useState} from 'react';
import { Form,Input ,Radio,RadioGroup} from 'rsuite';
import { auth, db, storage } from '../../firebase';
import { serverTimestamp, collection, setDoc, onSnapshot } from 'firebase/firestore';



export const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
export const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
export const RadioPicker = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <RadioGroup
      name={name}
      inline
      appearance="picker"
      ref={ref}
      label={label}
      accepter={accepter}
      {...rest}
      
    >
      <Radio value="forSale">For Sale</Radio>
      <Radio value="forRent">Rental</Radio>
      <Radio value="sold">Sold</Radio>
    </RadioGroup>
  );
});
export const auditLogger = async ({ action = "Added Listing" }) => {
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

export default TextField;