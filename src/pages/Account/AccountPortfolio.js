import { AccountPagePortfolio, StyledProfileLabel, StyledInput,AccGridInfo } from  "../../components/AccountStyles";
import { auth, db } from "../../firebase";
import React, { useState, forwardRef, useRef } from "react";
import { Form } from "rsuite";
import { useAuthState } from "react-firebase-hooks/auth";
import { where ,getDoc} from "firebase/firestore";


const PortfolioField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
export const AccountPagePortfolioBox = () => {
  const user = auth.currentUser;
  const [formValue, setFormValue] = useState({
    min: "",
    max:""})
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  

  const handlePortfolioChange = (e) => {
    e.preventDefault();
    let newDoc = doc(collection(db,"users"))
  };
  const getData = async() => {
    let user = auth.currentUser;
    let q = query(collection(db,"users"),where("uuid", "==", user.uid));
    try {
      getDoc(q).then((doc)=>{
        setFormValue(...doc.data());
      })
    } catch (error) {
      console.log(error);
    }
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
        <Form ref={formRef}
          onChange={setFormValue}
        value={formValue}>
          <PortfolioField
            name="minimum"
          label="Minimum Budget">
        </PortfolioField>
        
          <StyledProfileLabel>Maximum Budget</StyledProfileLabel>
          <StyledInput id="account-page-maximum-budget"></StyledInput>
          <ErrorMessage id="error-msg-maximum-budget">
            Can only contain , or numbers
          </ErrorMessage>
       
          <ProfileButton onClick={handlePortfolioChange}>Save</ProfileButton>
          </Form>
      </AccGridInfo>
    </div>
  );
};

export default AccountPagePortfolioBox;