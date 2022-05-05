import styled from 'styled-components';
import Textfield from '../components/Textfield';



const ChangePassword = () => {
    
    
    const [error, setError] = useState(false);
    const user = sessionStorage.getItem('user');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const handlePWChange = () => {
 
       const docRef= async() => await getDoc(db,"users")

    }
    return (
      <AccountPwContainer>
        <h4>Change Password</h4>
        <p>
                <Textfield
                    label="Change Password: "
                    canEdit
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                />
          <ErrorMessage id="error-msg-old-password" >
            Incorrect Password
          </ErrorMessage>
        </p>
        <p>
                <Textfield
                    label="Old Password :"
                    canEdit
                    onChange={e => setOldPassword(e.target.value)}
                    value={oldPassword}
                />
          <ErrorMessage id="error-msg-change-password" >
            Password must be at least 8 characters long
          </ErrorMessage>
          <ErrorMessage id="error-msg-same-password" >
            Must be a new password
          </ErrorMessage>
        </p>
        <p>
                <Textfield
                    label="Confirm Password"
                    canEdit
                    onChange={e => confirmPassword(e.target.value)}
                    value={setConfirmPassword}
                />
          <ErrorMessage id="error-msg-change-password-confirm" >
            Passwords must match
          </ErrorMessage>
        </p>
        <ProfileButton  >
          Change
        </ProfileButton>
      </AccountPwContainer>
    )
}