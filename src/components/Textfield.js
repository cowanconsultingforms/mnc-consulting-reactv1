import React from 'react';
import styled from 'styled-components'


const TextLabel = styled.label`
  font-size: 20px;
`;
const TextInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  left: 5%;
`;
const ReadOnlyTextbox = styled.input`
  pointer-events: none;
  color: white;
  background-color: rgb(158, 158, 158);
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
`;
const TextField = ({ label, value, onChange, canEdit, placeholder = '' }) => {

    const renderTextBox = () => {
        if (canEdit) {
            return <TextInput value={value} onChange={onChange} placeholder={placeholder}/>
        }
        return <ReadOnlyTextbox value={value} />
    }

    return (
        <React.Fragment>
            <TextLabel>{label}</TextLabel>
            {renderTextBox()}
        </React.Fragment>
    );
}

export default TextField;