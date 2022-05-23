import styled from "styled-components";



export const AccountLabel = styled.label`
  font-size: 20px;
`;
export const AccountInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  left: 5%;
`;
export const ProfileNoEdit = styled.input`
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
export const ErrorMessage = styled.label`
  color: red;
  display: none;
`;
export const AccountPwContainer = styled.div`
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
  height: 100%;
  grid-column: 1 / span 2;
  grid-row: 4 / span 3;
  border-color: black;
  border-width: thin;
`;

export const AccGridInfo = styled.div`
  position: relative;
  width: 90%;
  left: 5%;
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
  grid-column: 3;
  grid-row: 2;
`;

export const StyledProfileLabel = styled.label`
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
`;
export const StyledInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
`;

export const AccountPageContainer = styled.div`
  margin: auto;
  padding-top: 100px;
  display: grid;
  width: 75%;
  height: 100%;
  grid-gap: 30px;
  grid-template-columns: 1fr !important;
`;

export const AccountPageHeader = styled.div`
  color: rgb(128, 128, 128);
  grid-row: 1;
  grid-column: 1 / span 3;
  text-align: center;
`;

export const AccountPagePortfolio = styled.div`
  width: 100%;
  grid-column: 3;
  grid-row: 2;
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
`;

export const AccountPageSignOut = styled.div`
display:flex;
flex-direction:row;
  height: 100%;
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 50%;
`;

export default {AccountInput,AccountLabel,AccountPageSignOut,AccountPageContainer,AccountPageHeader,AccountPagePortfolio,AccGridInfo,ProfileNoEdit,ProfileButton,ErrorMessage,AccountPwContainer,StyledProfileLabel,StyledInput};