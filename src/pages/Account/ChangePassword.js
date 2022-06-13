import styled from 'styled-components';
import TextField from '../../components/TextField';
import { ProfileButton } from '../../components/Buttons';
import { Form, Schema, FlexboxGridbrea } from 'rsuite';
import { sendPasswordReset ,auth} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';




export const ChangePassword = () => {
    
  const [user, loading, error] = useAuthState(auth);
  const [errors, setErrors] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValue, setFormValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''

  });


  const handlePWChange = (e) => {
    e.preventDefault();
 
    const docRef= async() => await getDoc(db,"users")

  }
  return (
    <div className="account-password-container">
      <h4>Change Password</h4>
      
        <TextField
            label="Change Password: "
                    canEdit
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                />
          <ErrorMessage id="error-msg-old-password" >
            Incorrect Password
          </ErrorMessage>
       
        <p>
                <TextField
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
                <TextField
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
      </div>
    )
}

export default ChangePassword;