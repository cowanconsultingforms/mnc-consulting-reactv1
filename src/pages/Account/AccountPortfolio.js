import { AccountPagePortfolio, StyledProfileLabel, StyledInput,AccGridInfo } from  "../../components/AccountStyles";
import { auth, db } from "../../firebase";
import { useForm } from "react-hook-form";
import React, { useState, forwardRef, useRef } from "react";
import { Form } from "rsuite";
import { useAuthState } from "react-firebase-hooks/auth";

export const AccountPagePortfolioBox = () => {
  const user = auth.currentUser;
  const [formValue, setFormValue] = useState({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,

  });
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  

  const handlePortfolioChange = (e) => {
    let userName = e.target.value;
    let userCollection = db.collection("users").doc();
  };
  const getPortfolio = async() => {
    let user = auth.currentUser;
    user.displayName = formValue.userName;
    return (
      <div>
        <Form ref={formRef}>
        </Form>
      </div>
    )
  };
  useEffect(() => {
    if (user) {
      setFormValue({
        uid: user.uid,

      })
    }
  })
  
  return (
    <div className="account-page-portfolio">
      <AccGridInfo>
        <h4 style="padding-bottom:15px; position:relative;">Portfolio</h4>
        <p>
          <StyledProfileLabel>Minimum Budget</StyledProfileLabel>
          <StyledInput id="account-page-minimum-budget"></StyledInput>
          <StyledInput id="error-msg-minimum-budget">
            Can only contain , or numbers
          </StyledInput>
        </p>
        <p>
          <StyledProfileLabel>Maximum Budget</StyledProfileLabel>
          <StyledInput id="account-page-maximum-budget"></StyledInput>
          <ErrorMessage id="error-msg-maximum-budget">
            Can only contain , or numbers
          </ErrorMessage>
        </p>
        <ProfileButton onClick={handlePortfolioChange}>Save</ProfileButton>
      </AccGridInfo>
    </div>
  );
};

export default AccountPagePortfolioBox;