import { StyledProfileLabel ,AccountPageSignOut} from "../../components/AccountStyles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignOut ,db,auth,} from "../../firebase";
import ProfileButton from "../../components/Buttons";
import { useAuthState } from "react-firebase-hooks/auth";



export const AccountPageSignOutBox = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await userSignOut().then(
      () => localStorage.removeItem(JSON.stringify(user)),
      navigate("/")
 
    );
        return <div></div>;
  };

  return (
    <AccountPageSignOut>
      <h4>Sign Out</h4>
    
        <StyledProfileLabel>
          Signing out? You can always log back in
        </StyledProfileLabel>

      <ProfileButton onClick={handleSignOut}>Sign Out</ProfileButton>
    </AccountPageSignOut>
  );
};

export default AccountPageSignOutBox;
