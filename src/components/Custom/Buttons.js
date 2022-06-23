import styled from 'styled-components';
import React,{useState,useEffect,forwardRef,useRef} from 'react';
import Button from '@mui/material/Button';

export const CustomButton =({title, handleAction})=> {
    return (
        <Button variant="contained" onClick={handleAction}>{title}</Button>
    );
}
export const ProfileButton = styled.button`
  margin-bottom: 20px;
  padding: 15px;
  font-size: 17px;
  color: white;
  border: 2px black;
  cursor: pointer;
  border-radius: 5px;
  background-color: #4193ff;
  left: 10%;
`;

export const LoginButton = forwardRef(({title, handleAction})=> {
  return (
        <Button variant="contained" onClick={handleAction}>{title}</Button>
    );
})
//const NavLink = React.forwardRef(({ href, children, ...rest }, ref)) => {
  //  return (
    //<Link ref={ref} to={href} {...rest}>
      //{children}
    //</Link>)
//}


//return (
  //<Nav.Item as={NavLink} href="/">
    //Home
  //</Nav.Item>
//);

export default ProfileButton;