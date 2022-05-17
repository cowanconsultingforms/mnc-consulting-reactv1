import { StyledProfileLabel } from "../../components/AccountStyles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignOut } from "../../firebase";
import Paragraph from 'rsuite/Paragraph';
import ProfileButton from "../../components/Buttons";


export const AccountPageSignOutBox = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await userSignOut().then(
      () => localStorage.removeItem("user"),
      navigate("/")
    );
  };

  return (
    <AccountPageSignOutBox>
      <h4>Sign Out</h4>
      <Paragraph>
        <StyledProfileLabel>
          Signing out? You can always log back in
        </StyledProfileLabel>
      </Paragraph>
      <ProfileButton onClick={handleSignOut}>Sign Out</ProfileButton>
    </AccountPageSignOutBox>
  );
};

export default AccountPageSignOutBox;
