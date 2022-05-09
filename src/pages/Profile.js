import { useState } from 'react'
import styled from 'styled-components';
import { db, userSignOut, auth } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import TextField from '../components/TextField';
import { ProfileButton } from "../components/Buttons";

const AccountPageProfile = styled.div`
  height: 100%;
  display:flex;
  position: relative;
  text-align: left;
  background-color: rgb(238, 238, 238);
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 90%;
  left: 5%;
  position: relative;
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

const ErrorMessage = styled.label`
  color: red;
  display: none;
`;

const Profile = ({userId,accountType,Email,userName}) => {

  const [userName, setUserName] = useState('')
  const retrieveUser = () => {
    const user = JSON.stringify(localStorage.getItem('user'));
    console.log(user);
  }
  const handleProfileChange = (e) => {
    let userName = e.target.value;
    let docRef = doc(db, "users", userName);
    const docSnap = async () => await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
    }
  };

  return (
        <AccountPageProfile>
          <h4>Profile</h4>
          <p>
            <TextField
          label="User ID:"
          value={userId}
              />  
          </p>
          <p>
          <TextField
          label="Account Type:"
          value={accountType}
              />
          </p>
          <p>
          <TextField
          label="Email"
          value={Email}
            />
          </p>
      <p>
              <TextField 
                  label="Username"
                  value={username}
                  canEdit
          onChange={e => setUsername(e.target.value)}
          required
              />
        <ErrorMessage id="error-msg-change-username">
          Usernames can only use letters, numbers, underscores and periods
          between 3-16 characters.
        </ErrorMessage>
      </p>
      <ProfileButton onClick={handleProfileChange}>Save</ProfileButton>
    </AccountPageProfile>
  );
};

export default Profile;
