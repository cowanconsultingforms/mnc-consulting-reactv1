import { StyledProfileLabel ,AccountPageSignOut} from "./AccountStyles";
import { useNavigate } from "react-router-dom";
import React,{ useState,useEffect } from "react";
import { userSignOut ,db,auth,} from "../../firebase";
import ProfileButton from "../../components/Custom/Buttons";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "rsuite";



export const AccountPageSignOutBox = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await userSignOut().then(
      () => localStorage.removeItem(JSON.stringify(user)),
      navigate("/")
 
    );
    
  };
  useEffect(()=>{

  })
  return (
    <AccountPageSignOut>
      <Container className="SignOutBox">
        <h4>Sign Out</h4>

        <StyledProfileLabel>
          Signing out? You can always log back in
        </StyledProfileLabel>

        <ProfileButton onClick={handleSignOut}>Sign Out</ProfileButton>
      </Container>
    </AccountPageSignOut>
  );
};

export default AccountPageSignOutBox;
