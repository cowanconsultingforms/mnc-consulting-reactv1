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
const ReadOnlyTextBox = styled.input`
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

 const StyledTextArea = styled.textarea`
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;
`;
export const TextArea = ({ label, value, onChange, placeholder =''}) => { 
  const renderTextArea = () => {
      return <StyledTextArea value={value} onChange={onChange} placeholder={placeholder}/>
    }
    return (
      <React.Fragment>
        <TextLabel>{label}</TextLabel>
          {renderTextArea()}
        </React.Fragment>
    );
}
  const TextField = ({ label, value, onChange, canEdit, placeholder = '' }) => {

    const renderTextBox = () => {
        if (canEdit) {
            return <TextInput value={value} onChange={onChange} placeholder={placeholder}/>
        }
        return <ReadOnlyTextBox value={value} />
    }

    return (
        <React.Fragment>
            <TextLabel>{label}</TextLabel>
            {renderTextBox()}
        </React.Fragment>
    );
}

export default TextField;