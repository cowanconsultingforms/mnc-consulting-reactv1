import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, userSignOut, auth } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';

const AccountLabel = styled.label`
  font-size: 20px;
`;
const AccountInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  left: 5%;
`;
const ProfileNoEdit = styled.input`
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
const ProfileButton = styled.button`
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
const ErrorMessage = styled.label`
  color: red;
  display: none;
`;
const AccountPwContainer = styled.div`
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


const AccGridInfo = styled.div`
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

const StyledProfileLabel = styled.label`
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
`;
const StyledInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
`;



const AccountPageContainer = styled.div`
  margin: auto;
  padding-top: 100px;
  display: grid;
  width: 75%;
  height: 100%;
  grid-gap: 30px;
  grid-template-columns: 1fr !important;
`;

const AccountPageHeader = styled.div`
  color: rgb(128, 128, 128);
  grid-row: 1;
  grid-column: 1 / span 3;
  text-align: center;
`;



const AccountPagePortfolio = styled.div`
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

const AccountPageSignOut = styled.div`
  height: 100%;
  grid-column: 3;
  grid-row: 3 / span 2;
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
`;
const AccountPageDeleteProfile = styled.div`
  height: 100%;
  grid-column: 3;
  grid-row: 5 / span 2;
  position: relative;
  text-align: left;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 100%;
`;



const AccountPage = () => {
    
  const AccountPagePortfolioBox = () => {
    
    const handlePortfolioChange = (e) => {
      let userName = e.target.value;
      let userCollection = db.collection("users").doc();
    };

    return (
      <AccountPagePortfolio>
        <AccGridInfo>
          <h4 style="padding-bottom:15px; position:relative;">Portfolio</h4>
          <p>
            <StyledProfileLabel>Minimum Budget</StyledProfileLabel>
            <StyledInput id="account-page-minimum-budget"></StyledInput>
            <ErrorMessage id="error-msg-minimum-budget">
              Can only contain , or numbers
            </ErrorMessage>
          </p>
          <p>
            <StyledProfileLabel>Maximum Budget</StyledProfileLabel>
            <StyledInput id="account-page-maximum-budget"></StyledInput>
            <ErrorMessage id="error-msg-maximum-budget">
              Can only contain , or numbers
            </ErrorMessage>
          </p>
          <ProfileButton onClick={handlePortfolioChange}>Save</ProfileButton>
        </AccGridInfo>
      </AccountPagePortfolio>
    );
  };
  
  const AccountPageSignOutBox = () => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
      await userSignOut().then(
        () => localStorage.removeItem("user"),
        navigate("/")
      );
    };

    return (
      <AccountPageSignOut>
        <h4>Sign Out</h4>
        <p>
          <StyledProfileLabel>
            Signing out? You can always log back in
          </StyledProfileLabel>
        </p>
        <ProfileButton onClick={handleSignOut}>Sign Out</ProfileButton>
      </AccountPageSignOut>
    );
  };

  const AccountPageDeleteProfileBox = () => {
    const navigate = useNavigate();

    const deleteUser = () => {
      const user = auth.currentUser;
      let docRef = db.collection("users").doc(db, user);
      deleteDoc(docRef).then(() => userSignOut());
      navigate("/");
    };
  
    return (
      <AccountPageDeleteProfile>
        <h4>Delete Account</h4>
        <p>
          <StyledProfileLabel>
            This action is permanent and cannot be reversed
          </StyledProfileLabel>
        </p>
        <ProfileButton id="delete-account" onClick={deleteUser}>
          Delete
        </ProfileButton>
      </AccountPageDeleteProfile>
    );
  };

    const AccountHeader = () => {
        return (
          <AccountPageHeader>
            <h1>My Account</h1>
          </AccountPageHeader>
        );
    };

    return <AccountPageContainer>
        <AccountHeader />
     
        <AccountPagePWChangeBox />
        <AccountPageDeleteProfileBox />
      
    
      
       
    </AccountPageContainer>
}
const AccountPagePWChangeBox = () => {
    const [error, setError] = useState(false);
    const user = sessionStorage.getItem('user');



    const handlePWChange = () => {
        let oldPw = document.getElementById('old-password');
        let newPw = document.getElementById('new-password');
       const docRef= async() => await getDoc(db,"users")

    }
    return (
      <AccountPwContainer>
        <h4>Change Password</h4>
        <p>
          <AccountLabel>Old Password</AccountLabel>
          <AccountInput
            id="old-password"
            placeholder="Enter Old Password"
            
          ></AccountInput>
          <ErrorMessage id="error-msg-old-password" >
            Incorrect Password
          </ErrorMessage>
        </p>
        <p>
          <AccountLabel>New Password</AccountLabel>
          <AccountInput
            id="new-password"
            placeholder="Enter New Password"
            
            type="password"
          ></AccountInput>
          <ErrorMessage id="error-msg-change-password" >
            Password must be at least 8 characters long
          </ErrorMessage>
          <ErrorMessage id="error-msg-same-password" >
            Must be a new password
          </ErrorMessage>
        </p>
        <p>
          <AccountLabel>Confirm New Password</AccountLabel>
          <AccountInput
            id="new-confirm-password"
            placeholder="Confirm New Password"
            type="password"
          ></AccountInput>
          <ErrorMessage id="error-msg-change-password-confirm" >
            Passwords must match
          </ErrorMessage>
        </p>
        <ProfileButton onClick={handlePWChange} >
          Change
        </ProfileButton>
      </AccountPwContainer>
    );
}

const APSignOutContainer = styled.div`
`
export default AccountPage;