import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { ProfileButton } from "../../components/Buttons";
import { Box,Typography } from "@mui/material";
import { sendPasswordReset, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, getDoc } from "firebase/firestore";
import { verifyPasswordResetCode, confirmPasswordReset,updateProfile } from "firebase/auth";


export const ChangePassword = () => {
  const [user, loading, error] = useAuthState(auth);
  const [errors, setErrors] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePWChange = (e) => {
    e.preventDefault();
   
   
  };
  return (
    <Box className="account-password-container">
      <Typography variant="h4">Change Password</Typography>
      {user.email}
      <TextField
        label="Change Password: "
        canEdit
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      />
      <TextField
        label="Old Password :"
        canEdit
        onChange={(e) => setOldPassword(e.target.value)}
        value={oldPassword}
      />
      <ErrorMessage id="error-msg-change-password">
        Password must be at least 8 characters long
      </ErrorMessage>
      <ErrorMessage id="error-msg-same-password">
        Must be a new password
      </ErrorMessage>

      <TextField
        label="Confirm Password"
        canEdit
        onChange={(e) => confirmPassword(e.target.value)}
        value={setConfirmPassword}
      />

      <ProfileButton>Change</ProfileButton>
    </Box>
  );
};

export default ChangePassword;
