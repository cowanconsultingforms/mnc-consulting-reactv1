import { AccountPagePortfolio, StyledProfileLabel, StyledInput,AccGridInfo } from  "../../components/AccountStyles";
import { auth, db } from "../../firebase";
import React, { useState, forwardRef, useRef, useEffect, collection} from "react";
import {Box,TextField} from '@mui/material'
import { useAuthState } from "react-firebase-hooks/auth";
import { where ,getDoc, query, doc} from "firebase/firestore";
import accountAuditLogger from './AccountPageComponents';



export const ProfileEdit = () => {
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

  })
  
  return (
    <div className="account-page-portfolio">

    </div>
  );
};

export default AccountPagePortfolioBox;