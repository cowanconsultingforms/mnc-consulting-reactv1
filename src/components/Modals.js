import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, app, } from '../firebase';


const LoginDiv = styled.div`
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);

`;

/*const LoginStyle = styled.Modal`

`
*/


const LoginModal = () => {
    return (
      <LoginDiv className="LoginModal">
        Modal
      </LoginDiv>
    );
}


export default LoginModal;