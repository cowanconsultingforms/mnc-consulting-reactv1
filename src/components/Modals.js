import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, app, } from '../firebase';
import { Modal } from 'rsuite';


const LoginDiv = styled.div`
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);

`;
export const ModalDiv = styled.div`
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 20%;
  background: rgb(209, 209, 209);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  position:fixed;
  left:0;
  top:0;
  overflow:auto;
`;
/*const LoginStyle = styled.Modal`

`
*/


const ModalContainer = ({ isOpen, onChange, className, }) => {
  const handleOnChange = (e) => {
    onChange(e=>e.target.value);
  }
    return (
      <ModalDiv className={className}
        isOpen
      onChange={(e=>e.target.value)}>
        Modal
      </ModalDiv>
    );
}


export default ModalContainer;