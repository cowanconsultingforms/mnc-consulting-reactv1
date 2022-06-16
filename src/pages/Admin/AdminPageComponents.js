import React, { forwardRef } from 'react';
import { Form,Input ,Radio,RadioGroup} from 'rsuite';

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
      
    >
      <Radio value="forSale">For Sale</Radio>
      <Radio value="forRent">Rental</Radio>
      <Radio value="sold">Sold</Radio>
    </RadioGroup>
  );
});

export default TextField;