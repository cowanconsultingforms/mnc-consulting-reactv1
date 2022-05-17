import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ProfileButton } from '../../components/AccountStyles';

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

const AccountPageDeleteProfileBox = ({ user }) => {
  if (user !== null) {
    user = auth.currentUser;
    return auth.currentUser;
  }
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

export default AccountPageDeleteProfileBox;
