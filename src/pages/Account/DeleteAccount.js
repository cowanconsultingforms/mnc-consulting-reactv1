import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, db,userSignOut } from '../../firebase';
import { ProfileButton } from '../../components/AccountStyles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { StyledProfileLabel } from '../../components/AccountStyles';
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
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const deleteUser = () => {
    const user = auth.currentUser;
    let docRef = db.collection("users").doc(db, user);
    deleteDoc(docRef).then(() => userSignOut());
    navigate("/");
  };
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  })
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

export default AccountPageDeleteProfileBox;
