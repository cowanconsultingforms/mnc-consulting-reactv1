import { useState } from 'react'
import styled from 'styled-components';
import { db, userSignOut, auth } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import TextField from '../components/Textfield';

const AccountPageProfile = styled.div`
  height: 100%;
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  position: relative;
  text-align: left;
  background-color: rgb(238, 238, 238);
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 90%;
  left: 5%;
  position: relative;
`;

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

const Profile = () => {

  const [username, setUsername] = useState('')
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
          />  
      </p>
      <p>
              <TextField
                  label="Account Type:"
              />
      </p>
      <p>
              <TextField
                  label="Email"
              />
      </p>
      <p>
              <TextField 
                  label="Username"
                  value={username}
                  canEdit
                  onChange={e => setUsername(e.target.value)}
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
