import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, db,userSignOut } from '../../firebase';
import { ProfileButton } from "./AccountStyles";
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteDoc,collection,doc,query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { StyledProfileLabel } from './AccountStyles';
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

const AccountPageDeleteProfileBox = () => {
  //custom hook from library to check user auth status
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  //function to delete the user's account
  const deleteUser = async(e) => {
    e.preventDefault();
    const user = auth.currentUser;
    let docRef = collection(db,"users").doc(user.uid);
    deleteDoc(docRef).then(() => userSignOut());
    navigate("/");
  };
  //useEffect hook that will navigate back to the home page if on the account page and not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  })
  return (
    <div className="delete-profile-box">
      <h4>Delete Account</h4>
      <p>
        <StyledProfileLabel>
          This action is permanent and cannot be reversed
        </StyledProfileLabel>
      </p>
      <ProfileButton id="delete-account" onClick={deleteUser}>
        Delete
      </ProfileButton>
    </div>
  );
};

export default AccountPageDeleteProfileBox;
