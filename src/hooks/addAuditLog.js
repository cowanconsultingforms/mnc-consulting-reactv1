import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth, app } from "../firebase";
import { query, getDocs, where, collection,serverTimestamp ,addDoc} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


export const addAuditLog = ({...props}) => { 
    const {User, Action,Timestamp,UserID } = this.props;
    const auditLog = collection('auditLog');
    
   
    const addToLog = async(e,user, action) => {
        const auditLog = collection(db,'auditLog');
       
            e.preventDefault()
            await addDoc(auditLog,{
                UserID: user.uid,
                UserName: user.displayName,
                Action: action,
                Timestamp: serverTimestamp()
            }).then((res) => {
                console.log(res)
            });
    }
}

export default addAuditLog;